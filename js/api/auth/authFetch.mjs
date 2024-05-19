import { load } from "../../storage/index.mjs";




export function headers() {
    const token = load('token');

    return = {
        "Content-Type": "application/json",
        "authorization": `Bear ${token}`
    };
}





export async function authFetch(url, options){

}