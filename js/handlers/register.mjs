import { register } from "../api/auth/register.mjs";

/**
 * Sets up an event listener for the registration form.
 *
 * On submit, it gathers the input values, creates a profile object,
 * and calls the register function to create the user and log in.
 *
 * @function
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
            alert("❌ Registration failed. Please try again.");
        }
    });
}


