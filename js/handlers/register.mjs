import { register } from "../api/auth/register.mjs"; 

export function setRegisterFormListener(){
    const form = document.getElementById('registerForm'); 

    form.addEventListener("submit", (event) => { 
        event.preventDefault();
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries());
        console.log("Registreringsdata:", profile);

        register(profile); 
    });
}

