import { API_BASE, API_PROFILE_STORAGE, API_TOKEN_STORAGE } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

export async function getProfile() {
    const user = storage.load(API_PROFILE_STORAGE);
    const token = storage.load(API_TOKEN_STORAGE);

    if (!user || !user.name) {
        console.error("❌ Ingen bruker funnet i localStorage!");
        return null;
    }

    try {
        const response = await fetch(`${API_BASE}/social/profiles/${user.name}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`❌ Kunne ikke hente profil: ${response.status}`);
        }

        const { data } = await response.json();
        console.log("✅ Profildata hentet:", data);
        return data;
    } catch (error) {
        console.error("❌ Feil ved henting av profil:", error);
        return null;
    }
}
