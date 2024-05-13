import { API_SOCIAL_URL } from "../constants.mjs";

const action = "/auth/login";
const method = "POST";


export async function login(profile){
    const loginURL = API_SOCIAL_URL + action;
    const body = JSON.stringify(profile);

   const fetchResponse = await fetch(loginURL, {
        headers: {
            'Content-Type': 'application/json'
        },
        method,
        body
    })

    const response = await fetchResponse.json();
    
    localStorage.setItem('token', result.accessToken);
}

