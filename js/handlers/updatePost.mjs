import { updatePost } from "../api/posts/update.mjs";

/**
 * Opens the edit modal and fills it with post data.
 * @param {Object} post - The post data.
 */
export function openEditPostModal(post) {
    document.getElementById("editPostId").value = post.id;
    document.getElementById("editPostTitle").value = post.title;
    document.getElementById("editPostBody").value = post.body;
    document.getElementById("editPostMedia").value = post.media?.url || "";

    const modal = new bootstrap.Modal(document.getElementById("editPostModal"));
    modal.show();
}

/**
 * Sets up an event listener for the update form.
 */
export function setUpdatePostListener() {
    const form = document.getElementById("editPostForm");

    if (!form) {
        console.error("❌ Edit post form not found!");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const id = document.getElementById("editPostId").value;
        const title = document.getElementById("editPostTitle").value;
        const body = document.getElementById("editPostBody").value;
        const mediaUrl = document.getElementById("editPostMedia").value;

        const postData = {
            id,
            title,
            body,
            media: mediaUrl ? { url: mediaUrl, alt: "Updated post image" } : null
        };

        try {
            await updatePost(postData);
            alert("✅ Post updated successfully!");
            location.reload(); // Refresh the page to see changes
        } catch (error) {
            console.error("❌ Error updating post:", error);
            alert("Error updating post: " + error.message);
        }
    });
}


