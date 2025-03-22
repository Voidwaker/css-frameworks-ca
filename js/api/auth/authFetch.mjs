import { load, remove } from "../../storage/index.mjs";
import { API_KEY_STORAGE, API_TOKEN_STORAGE } from "../constants.mjs";

/**
 * Generates headers for an authenticated API request.
 * Includes Authorization and X-Noroff-API-Key if available in localStorage.
 *
 * @returns {Object} Headers object for fetch.
 */
export function headers() {
	const token = load(API_TOKEN_STORAGE);
	const apiKey = load(API_KEY_STORAGE);

	if (!token || !apiKey) {
		return {};
	}

	return {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`,
		"X-Noroff-API-Key": apiKey
	};
}

/**
 * Makes an authenticated fetch request using stored token and API key.
 *
 * @param {string} url - The endpoint to send the request to.
 * @param {Object} [options={}] - Optional fetch options.
 * @returns {Promise<Response>} The fetch response object.
 * @throws {Error} Throws if the fetch fails or the response is not OK.
 */
export async function authFetch(url, options = {}) {
	const requestOptions = {
		...options,
		headers: {
			...headers(),
			...options.headers
		}
	};

	try {
		const response = await fetch(url, requestOptions);

		if (!response.ok) {
			const errorData = await response.json();
			const status = response.status;
			const message = errorData?.errors?.[0]?.message || "Unknown error";

			if (status === 401) {
				remove(API_TOKEN_STORAGE);
				remove(API_KEY_STORAGE);
				remove("profile");

				document.body.innerHTML = `
					<div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background-color: red; color: white; padding: 10px; border-radius: 5px; z-index: 1000;">
						❌ You must be logged in to access this page. Redirecting to login...
					</div>
				`;

				setTimeout(() => {
					window.location.href = "/index.html";
				}, 1500);

				return;
			}

			throw new Error(`HTTP error! status: ${status}, message: ${message}`);
		}

		return response;
	} catch (error) {
		console.error("❌ Fetch error:", error);
		throw error;
	}
}


 


