import { API_SOCIAL_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "POST";


export async function login(profile){
    const loginURL = API_SOCIAL_URL + action;
    const body = JSON.stringify(profile);

   const Response = await fetch(loginURL, {
        headers: {
            'Content-Type': 'application/json'
        },
        method,
        body
    })

    const {accessToken, ...user} = await Response.json()
    storage.save('token', accessToken)

    storage.save('profile', user)

    alert('Login successful');
    


} 
