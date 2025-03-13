import { API_CREATE_API_KEY, API_KEY_STORAGE, API_TOKEN_STORAGE } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

export async function createApiKey() {
    const token = storage.load(API_TOKEN_STORAGE);

    if (!token) {
        console.error("❌ Ingen accessToken funnet. Brukeren må logge inn først.");
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
            console.error("❌ Feil ved opprettelse av API-nøkkel:", errorData);
            throw new Error(errorData.errors?.[0]?.message || `HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        storage.save(API_KEY_STORAGE, data.key); // Lagre den nyeste API-nøkkelen

        console.log("🟢 API-nøkkel lagret:", data.key);
        return data.key;
    } catch (error) {
        console.error("❌ Kunne ikke opprette API-nøkkel:", error);
        return null;
    }
}
