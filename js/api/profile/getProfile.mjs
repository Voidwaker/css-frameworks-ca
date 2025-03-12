import { API_BASE, API_PROFILE_STORAGE, API_TOKEN_STORAGE, DEFAULT_API_KEY } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

export async function getProfile() {
    const user = storage.load(API_PROFILE_STORAGE);
    const token = storage.load(API_TOKEN_STORAGE);

    if (!user || !user.name) {
        console.error("❌ Ingen bruker funnet i localStorage!");
        return null;
    }

    console.log("🔵 Henter profil for:", user.name);

    try {
        const response = await fetch(`${API_BASE}/social/profiles/${user.name}?_followers=true&_following=true&_posts=true`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-Noroff-API-Key": DEFAULT_API_KEY,
                "Content-Type": "application/json"
            }
        });

        console.log("🟢 API respons mottatt:", response);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ API-feil:", errorData);
            throw new Error(`Kunne ikke hente profil: ${errorData.message || response.status}`);
        }

        const { data } = await response.json();
        console.log("✅ Profildata:", data);
        return data;
    } catch (error) {
        console.error("❌ Feil ved henting av profil:", error);
        return null;
    }
}
