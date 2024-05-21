import { load } from "../../storage/index.mjs";

export function headers() {
    const token = load("token");

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
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


 


