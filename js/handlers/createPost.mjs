import { createPost } from "../api/posts/create.mjs";

/**
 * Sets up an event listener for the post creation form.
 * When the form is submitted, it collects the form data, processes it,
 * and sends a request to create a new post via the API.
 */
export function setCreatePostFormListener() {
    console.log("🟢 Running setCreatePostFormListener()");
    
    const form = document.querySelector("#createPost");

    if (!form) {
        console.error("❌ Form not found!");
        return;
    }

    console.log("✅ Found post creation form.");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        console.log("🟢 Form submitted! Gathering data...");
        const formData = new FormData(event.target);
        const post = Object.fromEntries(formData.entries());

        // Convert tags to an array
        if (post.tags && typeof post.tags === "string") {
            post.tags = post.tags.split(',').map(tag => tag.trim());
        }

        if (!Array.isArray(post.tags)) {
            post.tags = [];
        }

        // Process media field
        if (post.media && post.media.trim() !== "") {
            post.media = { url: post.media.trim(), alt: "User uploaded image" };
        } else {
            delete post.media; // Remove media field if empty
        }

        console.log("📡 Sending post to API:", post);

        try {
            const response = await createPost(post);
            console.log("✅ Post created successfully:", response);
            alert("Post created successfully");
            window.location.reload();
        } catch (error) {
            console.error("❌ Error creating post:", error);
            alert("Error creating post: " + error.message);
        }
    });
}













