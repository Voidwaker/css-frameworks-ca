import { API_SOCIAL_URL } from '../constants.mjs';

const action = '/auth/register';
const method = 'POST';

export async function register(profile) {
    const registerURL = API_SOCIAL_URL + '/auth/register';
    const body = JSON.stringify(profile);

    const response = await fetch(registerURL, {
        headers: {
            "Content-Type": "application/json"
        },
        method,
        body
    })
const result = await response.json()
console.log("response body:", result)

}