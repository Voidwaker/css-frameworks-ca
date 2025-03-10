import { login } from "../api/auth/login.mjs";

export function setloginFormListener() {
    const form = document.querySelector("#loginForm");

    if (!form) {
        console.error("❌ Login form not found");
        return;
    }

    console.log("🟢 Login form found, adding event listener...");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const email = formData.get("email");
        const password = formData.get("password");

        console.log("🔵 Sending login request with:", { email, password });

        const result = await login(email, password);

        if (result) {
            alert("Innlogging vellykket!");
            window.location.href = "/feed/index.html"; 
        } else {
            alert("❌ Innlogging feilet. Sjekk konsollen for mer info.");
        }
    });
}
