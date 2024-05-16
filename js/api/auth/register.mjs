import { API_SOCIAL_URL } from "../constants.mjs";

const action = "/auth/register";
const method = "POST";

export async function register(profile){
    const registerURL = API_SOCIAL_URL + action;
    const body = JSON.stringify(profile);


    const Response = await fetch(registerURL, {
        headers: {
            'Content-Type': 'application/json'
        },
        method,
        body
    })

    const response = await Response.json();
    alert('Registration successful');
    console.log(response);
}