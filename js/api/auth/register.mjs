import { API_REGISTER, API_PROFILE_STORAGE, API_TOKEN_STORAGE } from "../constants.mjs";
import { createApiKey } from "./createApiKey.mjs";
import * as storage from "../../storage/index.mjs";

/**
 * Registers a new user by sending the provided profile data to the API.
 *
 * This function sends a POST request to the API endpoint defined by API_REGISTER with the
 * provided profile data. It then processes the response, saves the user profile and token
 * to storage, and returns the resulting user data if registration is successful.
 *
 * @async
 * @param {Object} profile - The user profile data used for registration.
 * @returns {Promise<Object|null>} The registered user data if registration is successful, otherwise null.
 *
 * @throws {Error} Throws an error if the network request fails or if the API returns an error.
 */
export async function register(profile) {
    console.log("🔵 `register()` function called with:", profile);

    try {
        const response = await fetch(API_REGISTER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        });

        console.log("🟢 API response object:", response);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ API error response:", errorData);
            throw new Error(`Feil ved registrering: ${errorData.message || response.status}`);
        }

        const { data } = await response.json();
        console.log("✅ Registrering vellykket! Brukerdata:", data);

        storage.save(API_PROFILE_STORAGE, data);
        storage.save(API_TOKEN_STORAGE, data.accessToken);

        console.log("💾 Data lagret i `localStorage`:", storage.load(API_PROFILE_STORAGE), storage.load(API_TOKEN_STORAGE));

        return data;
    } catch (error) {
        console.error("❌ Feil under registrering:", error);
        return null;
    }
}
