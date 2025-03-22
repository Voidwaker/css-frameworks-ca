import { API_BASE, API_PROFILE_STORAGE, API_TOKEN_STORAGE, DEFAULT_API_KEY } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

/**
 * Fetches the full profile of the currently logged-in user from the API.
 *
 * Includes posts, followers, and following data using query parameters.
 *
 * @async
 * @returns {Promise<Object|null>} A promise that resolves with the user profile data if successful, or null if failed.
 *
 * @example
 * const profile = await getProfile();
 * console.log(profile.name); // Output: user's name
 */
export async function getProfile() {
    const user = storage.load(API_PROFILE_STORAGE);
    const token = storage.load(API_TOKEN_STORAGE);

    if (!user || !user.name) {
        console.error("❌ no user found in localstorage!");
        return null;
    }

    try {
        const response = await fetch(
            `${API_BASE}/social/profiles/${user.name}?_followers=true&_following=true&_posts=true`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "X-Noroff-API-Key": DEFAULT_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`could not fetch user: ${errorData.message || response.status}`);
        }

        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error("❌ error under fetching profile:", error);
        return null;
    }
}

