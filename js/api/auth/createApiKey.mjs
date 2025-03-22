import { API_CREATE_API_KEY, API_KEY_STORAGE, API_TOKEN_STORAGE } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

/**
 * Creates a new API key for the currently authenticated user.
 *
 * The access token must already be stored in localStorage.
 * On success, the new API key is saved to localStorage and returned.
 *
 * @async
 * @returns {Promise<string|null>} The newly created API key, or null if creation fails.
 *
 * @example
 * const apiKey = await createApiKey();
 * console.log(apiKey); // "b1c8e1aa-...."
 */
export async function createApiKey() {
    const token = storage.load(API_TOKEN_STORAGE);

    if (!token) {
        console.error("❌ No access token found. User must be logged in.");
        return null;
    }

    try {
        const response = await fetch(API_CREATE_API_KEY, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: "My API Key" })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors?.[0]?.message || `HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        storage.save(API_KEY_STORAGE, data.key);
        return data.key;
    } catch (error) {
        console.error("❌ Failed to create API key:", error);
        return null;
    }
}
