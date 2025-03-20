import { register } from "../api/auth/register.mjs";

/**
 * Initializes event listener for the registration form.
 * 
 * When the form is submitted, this function collects user input, 
 * attempts to register the user, logs them in automatically, 
 * and redirects to the profile page.
 * 
 * @function
 * @returns {void}
 */
export function setRegisterFormListener() {
    const form = document.querySelector("#registerForm");

    if (!form) {
        console.error("❌ Register form not found");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries());

        try {
            await register(profile);
        } catch (error) {
            console.error("❌ Registration failed:", error);
            alert("❌ Registration failed. Please try again.");
        }
    });
}

