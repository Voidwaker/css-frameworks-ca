import { API_LOGIN, API_PROFILE_STORAGE, API_TOKEN_STORAGE } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";
import { createApiKey } from "./createApiKey.mjs";

/**
 * Logs in a user with the given credentials.
 *
 * This function sends a POST request to the API endpoint defined by API_LOGIN with the provided
 * email and password. If the login is successful, it saves the user's profile and access token in storage,
 * creates an API key, and returns the user data. If it fails, an error is thrown and caught.
 *
 * @async
 * @param {string} email - The email address of the user.
 * @param {string} password - The user's password.
 * @returns {Promise<Object|null>} The logged in user data if successful, otherwise null.
 *
 * @throws {Error} Throws an error if the login fails due to a network error or if the API returns an error.
 */
export async function login(email, password) {
    console.log("🔵 Logger inn med:", email);

    try {
        const response = await fetch(API_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        console.log("🟢 Login-respons:", response);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`❌ Login feilet: ${errorData.message || response.status}`);
        }

        const { data } = await response.json();
        console.log("🟢 Login vellykket:", data);

        storage.save(API_PROFILE_STORAGE, data);
        storage.save(API_TOKEN_STORAGE, data.accessToken);

        await createApiKey(); 

        return data;
    } catch (error) {
        console.error("❌ Feil under login:", error);
        return null;
    }
}