import { API_SOCIAL_URL } from '../constants.mjs';

/* export async function login(profile) {
    const loginURL = API_SOCIAL_URL + '/auth/login';
    const body = JSON.stringify(profile);

    try {
        const response = await fetch(loginURL, {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: body
        });

        const result = await response.json();
        if (!response.ok) {
            console.error("Login failed:", result);
            throw new Error(result.message || "An error occurred during login");
        }

        console.log("Login success:", result);
        return result; 
    } catch (error) {
        console.error("Network or server error:", error);
        throw error; 
    }
} */

     const action = '/auth/login';
    const method = 'POST';

export async function login(profile) {
    const loginURL = API_SOCIAL_URL + '/auth/login';
    const body = JSON.stringify(profile);

    const response = await fetch(loginURL, {
        headers: {
            "Content-Type": "application/json"
        },
        method,
        body
    })
const result = await response.json()
console.log("response body:", result)

} 
