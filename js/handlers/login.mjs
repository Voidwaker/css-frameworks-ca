import { login } from "../api/auth/login.mjs"; 

export function setLoginFormListener(){
    const form = document.getElementById('loginForm'); 

    form.addEventListener("submit", (event) => { 
        event.preventDefault();
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries());
        console.log("Registreringsdata:", profile);

        login(profile); 
    });
}

