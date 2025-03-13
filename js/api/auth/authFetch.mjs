import { load } from "../../storage/index.mjs";
import { API_KEY_STORAGE, API_TOKEN_STORAGE } from "../constants.mjs";

export function headers() {
    const token = load(API_TOKEN_STORAGE);
    const apiKey = load(API_KEY_STORAGE); // Bruk den nyeste API-nøkkelen

    if (!token || !apiKey) {
        console.error("❌ Token eller API-nøkkel mangler!");
        return {};
    }

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey
    };
}

export async function authFetch(url, options = {}) {
    const requestOptions = {
        ...options,
        headers: {
            ...headers(),
            ...options.headers
        }
    };

    console.log(`📡 Sender request til API: ${url}`);
    console.log(`🔑 Bruker API-nøkkel: ${requestOptions.headers["X-Noroff-API-Key"]}`);
    console.log(`🔐 Bruker token: ${requestOptions.headers["Authorization"]}`);

    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ Feil fra API:", errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error("❌ Feil under fetch:", error);
        throw error;
    }
}


 


