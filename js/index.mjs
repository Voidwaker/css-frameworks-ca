import { setRegisterFormListener } from "./handlers/register.mjs";
import { setloginFormListener } from "./handlers/login.mjs";

import * as posts from "./api/posts/index.mjs";


    const path = location.pathname;
    if (path === "/register.html") {
        setRegisterFormListener();
    } else if (path === "/") {
        setloginFormListener();
    }



    posts.create();

    posts.read();

    posts.readMany();

    posts.update();

    posts.delete();
