import { setRegisterFormListener } from "./handlers/register.mjs";
import { setloginFormListener } from "./handlers/login.mjs";
import { createPost } from "./api/posts/create.mjs";

    const path = location.pathname;

    if (path === "/register.html") {
        setRegisterFormListener();
    } else if (path === "/") {
        setloginFormListener();
    } else if (path === "/feed/create.html") {
    const form = document.querySelector("#createPostForm");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        
        
        const postData = Object.fromEntries(formData.entries());
        
        
        const fileInput = form.querySelector('#postImage');
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            postData.image = await toBase64(file);
        }

        createPost(postData);
    });
}


function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}