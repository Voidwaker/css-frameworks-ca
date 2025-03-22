import { login } from "../api/auth/login.mjs";

/**
 * Adds a submit listener to the login form.
 * 
 * On submission, it collects the credentials and attempts to log the user in.
 * If successful, redirects to the profile page. Otherwise, shows an error message.
 *
 * @example
 * setloginFormListener(); // Kalles vanligvis ved innlasting av login-siden
 */
export function setloginFormListener() {
    const form = document.querySelector("#loginForm");

    if (!form) {
        console.error("❌ Login form not found");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const email = formData.get("email");
        const password = formData.get("password");

        const result = await login(email, password);

        if (result) {
            alert("Innlogging vellykket!");
            window.location.href = "/profile/index.html";
        } else {
            alert("❌ login failed, check console for more info.");
        }
    });
}

