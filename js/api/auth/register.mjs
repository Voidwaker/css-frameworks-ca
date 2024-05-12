import { API_SOCIAL_URL } from '../constants.mjs';

export async function register(profile) {
    const registerURL = API_SOCIAL_URL + '/auth/register';
    console.log("Register URL:", registerURL);
}
