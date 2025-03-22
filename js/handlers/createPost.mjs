import { createPost } from "../api/posts/create.mjs";

/**
 * Sets up an event listener for the post creation form.
 *
 * When the form is submitted, this function collects the form data,
 * processes tags and media values, and sends it to the API to create a new post.
 * After success, the page reloads.
 *
 * @example
 * setCreatePostFormListener(); // Call on DOM load
 */
export function setCreatePostFormListener() {
    const form = document.querySelector("#createPost");

    if (!form) {
        console.error("❌ Post creation form not found.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const post = Object.fromEntries(formData.entries());

        if (post.tags && typeof post.tags === "string") {
            post.tags = post.tags.split(',').map(tag => tag.trim());
        }

        if (!Array.isArray(post.tags)) {
            post.tags = [];
        }

        if (post.media && post.media.trim() !== "") {
            post.media = { url: post.media.trim(), alt: "User uploaded image" };
        } else {
            delete post.media;
        }

        try {
            await createPost(post);
            alert("Post created successfully!");
            window.location.reload();
        } catch (error) {
            console.error("❌ Error creating post:", error);
            alert("Error creating post: " + error.message);
        }
    });
}














