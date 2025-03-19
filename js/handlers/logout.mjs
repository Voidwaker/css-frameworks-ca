import * as storage from "../storage/index.mjs";

/**
 * Logs out the user by removing authentication data and redirecting to the login page.
 */
export function logout() {
    console.log("🔴 Logging out...");

    storage.remove("token");
    storage.remove("apiKey");
    storage.remove("profile");

    window.location.href = "/index.html";
}
