import { setRegisterFormListener } from "./handlers/register.mjs";
import { setloginFormListener } from "./handlers/login.mjs";
import { createPost } from "./api/posts/create.mjs";

    const path = location.pathname;

    if (path === "/register.html") {
        setRegisterFormListener();
    } else if (path === "/") {
        setloginFormListener();
    }

createPost({
    title: "this is a test post",
    body: "this is alos a test post"
})