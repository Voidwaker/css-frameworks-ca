import { updatePost } from "../api/posts/update.mjs";

/**
 * Opens the edit modal and pre-fills it with the selected post's data.
 *
 * @param {Object} post - The post object to edit.
 * @param {string} post.id - The ID of the post.
 * @param {string} post.title - The title of the post.
 * @param {string} post.body - The content/body of the post.
 * @param {Object} [post.media] - Optional media object containing a URL.
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
 * Sets up a submit listener on the edit post form.
 * Sends updated post data to the API and reloads the page on success.
 */
export function setUpdatePostListener() {
    const form = document.getElementById("editPostForm");

    if (!form) return;

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
            location.reload();
        } catch (error) {
            alert("❌ Error updating post: " + error.message);
        }
    });
}


