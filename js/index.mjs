import { setRegisterFormListener } from "./handlers/register.mjs";
import { setloginFormListener } from "./handlers/login.mjs";
import * as post from "./api/posts/index.mjs";

    const path = location.pathname;

    if (path === "/register.html") {
        setRegisterFormListener();
    } else if (path === "/") {
        setloginFormListener();
    } 

    //post.createPost()
    //post.updatePost()
    //post.removePost()
    //post.getPost()
 
    post.getPosts().then(console.log);

