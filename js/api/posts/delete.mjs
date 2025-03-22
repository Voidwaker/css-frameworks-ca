import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

/**
 * Deletes a post from the API and removes it visually from the DOM.
 *
 * @async
 * @param {string} postId - The ID of the post to delete.
 * @returns {Promise<void>}
 * @throws {Error} If deletion fails.
 *
 * @example
 * await deletePost("123");
 */
export async function deletePost(postId) {
    if (!postId) {
        throw new Error("DELETE requires a valid post ID.");
    }

    const deleteUrl = `${API_SOCIAL_URL}/posts/${postId}`;

    try {
        const response = await authFetch(deleteUrl, { method: "DELETE" });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors?.[0]?.message || `HTTP error! Status: ${response.status}`);
        }

        // Visuelt fjerner posten fra DOM
        const postElement = document.querySelector(`[data-post-id="${postId}"]`);
        if (postElement) {
            postElement.classList.add("fade-out");
            setTimeout(() => postElement.remove(), 500);
        }

        showDeleteConfirmation();
    } catch (error) {
        alert("Error deleting post: " + error.message);
    }
}

/**
 * Displays a confirmation alert and reloads the page after 2 seconds.
 */
function showDeleteConfirmation() {
    const confirmation = document.createElement("div");
    confirmation.className = "alert alert-success fixed-top text-center";
    confirmation.textContent = "✅ Post deleted successfully! Reloading...";

    document.body.appendChild(confirmation);

    setTimeout(() => {
        confirmation.classList.add("fade-out");
        setTimeout(() => {
            confirmation.remove();
            location.reload();
        }, 500);
    }, 2000);
}

