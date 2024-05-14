import { setRegisterFormListener } from "./handlers/register.mjs";
import { setloginFormListener } from "./handlers/login.mjs";


    const path = location.pathname;
    if (path === "/register.html") {
        setRegisterFormListener();
    } else if (path === "/") {
        setloginFormListener();
    }

