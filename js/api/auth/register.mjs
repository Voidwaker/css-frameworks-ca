import { API_REGISTER, API_PROFILE_STORAGE, API_TOKEN_STORAGE } from "../constants.mjs";
import { createApiKey } from "./createApiKey.mjs";
import { login } from "./login.mjs";
import * as storage from "../../storage/index.mjs";

/**
 * Registers a new user, logs them in automatically, and redirects to the profile page.
 *
 * @async
 * @param {Object} profile - The user profile data used for registration.
 * @param {string} profile.name - The user's chosen username.
 * @param {string} profile.email - The user's email address (must be a Noroff email).
 * @param {string} profile.password - The user's password.
 * @returns {Promise<Object|null>} The registered user data if successful, otherwise null.
 */
export async function register(profile) {
    console.log("📡 Sending registration request...");

    try {
        const response = await fetch(API_REGISTER, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profile)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ Registration failed:", errorData);
            throw new Error(errorData.message || `HTTP Error ${response.status}`);
        }

        const { data } = await response.json();
        console.log("✅ Registration successful! User:", data);

        console.log("🔐 Logging in automatically...");
        const loggedInUser = await login(profile.email, profile.password);

        if (!loggedInUser) {
            console.error("❌ Auto-login failed after registration.");
            return null;
        }

        console.log("✅ Auto-login successful!", loggedInUser);

        storage.save(API_PROFILE_STORAGE, loggedInUser);
        storage.save(API_TOKEN_STORAGE, loggedInUser.accessToken);

        await createApiKey();

        console.log("⏳ Redirecting to profile page...");
        setTimeout(() => {
            window.location.assign("/profile/index.html");
        }, 500);

        return loggedInUser;
    } catch (error) {
        console.error("❌ Registration error:", error);
        return null;
    }
}
