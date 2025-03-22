import * as storage from "../storage/index.mjs";

/**
 * Logs out the user by clearing relevant data from localStorage and redirecting to login.
 *
 * @example
 * logout(); // Brukes f.eks. når brukeren klikker på "Logout"-knappen
 */
export function logout() {
    storage.remove("token");
    storage.remove("apiKey");
    storage.remove("profile");

    window.location.href = "/index.html";
}
