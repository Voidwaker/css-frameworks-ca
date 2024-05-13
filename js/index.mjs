import { setRegisterFormListener } from "./handlers/register.mjs";
import { setloginFormListener } from "./handlers/login.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const path = location.pathname;
    if (path === "/register.html") {
        setRegisterFormListener();
    } else if (path === "/login.html") {
        setloginFormListener();
    }
});
