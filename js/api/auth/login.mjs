import { API_LOGIN, API_PROFILE_STORAGE, API_TOKEN_STORAGE } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";
import { createApiKey } from "./createApiKey.mjs";

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
