import { createPost } from "../api/posts/create.mjs";

export function setCreatePostFormListener() {
    const form = document.querySelector("#createPost");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries());

            if (post.tags) {
                post.tags = post.tags.split(',').map(tag => tag.trim());
            } else {
                post.tags = [];
            }

            createPost(post)
                .then(response => {
                    alert('Post created successfully');
                })
                .catch(error => {
                    console.error('Error creating post:', error);
                });
        });
    } else {
        console.error('Form not found!');
    }
}










