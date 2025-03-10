import { register } from "../api/auth/register.mjs";

export function setRegisterFormListener() {
    const form = document.querySelector("#registerForm");

    if (!form) {
        console.error("❌ Register form not found");
        return;
    }

    console.log("🟢 Register form found, adding event listener...");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries());

        console.log("🔵 Sending registration request with:", profile);

        const result = await register(profile);

        if (result) {
            alert("✅ Registrering vellykket! Du kan nå logge inn.");
            window.location.href = "/index.html";
        } else {
            alert("❌ Registrering feilet. Sjekk konsollen for mer info.");
        }
    });
}

