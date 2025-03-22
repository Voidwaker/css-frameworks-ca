import { API_LOGIN, API_PROFILE_STORAGE, API_TOKEN_STORAGE } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";
import { createApiKey } from "./createApiKey.mjs";

/**
 * Logs in a user with the given credentials and stores token/profile in localStorage.
 *
 * Also automatically creates an API key after successful login.
 *
 * @async
 * @param {string} email - The email address of the user.
 * @param {string} password - The user's password.
 * @returns {Promise<Object|null>} The logged in user data if successful, otherwise null.
 *
 * @example
 * const user = await login("ola@noroff.no", "SuperSecret123");
 * if (user) console.log("Welcome", user.name);
 */
export async function login(email, password) {
    try {
        const response = await fetch(API_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Login failed. Status: ${response.status}`);
        }

        const { data } = await response.json();

        storage.save(API_PROFILE_STORAGE, data);
        storage.save(API_TOKEN_STORAGE, data.accessToken);

        await createApiKey();

        return data;
    } catch (error) {
        console.error("❌ Login error:", error);
        return null;
    }
}
