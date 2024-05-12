import { API_SOCIAL_URL } from '../constants.mjs';

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