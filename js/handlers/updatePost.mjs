import { updatePost } from "../api/posts/update.mjs";

export function setUpdatePostListener() {
    console.log("setUpdatePostListener called"); 
    const form = document.querySelector("#editPost");
    console.log("Form found:", form); 

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries());
            post.id = id;

            console.log('Updating post with data:', post); 
            updatePost(post)
                .then(response => {
                    console.log('Post updated successfully:', response); 
                })
                .catch(error => {
                    console.error('Error updating post:', error);
                });
        });
    } else {
        console.error('Form not found!');
    }
}

