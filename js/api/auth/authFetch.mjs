import { load } from "../../storage/index.mjs";
import { API_KEY_STORAGE, API_TOKEN_STORAGE, DEFAULT_API_KEY } from "../constants.mjs";

export function headers() {
    const token = load(API_TOKEN_STORAGE);
    const apiKey = localStorage.getItem(API_KEY_STORAGE) || DEFAULT_API_KEY;

    return {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
        "X-Noroff-API-Key": apiKey
    };
}

export async function authFetch(url, options = {}){
    const requestOptions = {
        ...options,
        headers: {
            ...headers(),
            ...options.headers
        }
    };

    try {
        const response = await fetch(url, requestOptions);
        return response;
    } catch (error) {
        console.error('Feil under fetch:', error);
        throw error;
    }
}


 


