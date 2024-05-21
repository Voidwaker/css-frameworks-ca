import { createPost } from "../api/posts/create.mjs";

export function setCreatePostFormListener() {
    console.log("setCreatePostFormListener called"); 
    const form = document.querySelector("#createPost");
    console.log("Form found:", form); 

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

            console.log('Creating post with data:', JSON.stringify(post, null, 2)); 

            createPost(post)
                .then(response => {
                    console.log('Post created successfully:', JSON.stringify(response, null, 2)); 
                })
                .catch(error => {
                    console.error('Error creating post:', error);
                });
        });
    } else {
        console.error('Form not found!');
    }
}










