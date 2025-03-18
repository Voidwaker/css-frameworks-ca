import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

/**
 * Deletes a post from the API and removes it from the UI.
 * If the deletion is successful, the post element is visually removed.
 * A confirmation message is displayed, and the page reloads automatically after a delay.
 *
 * @param {string} postId - The ID of the post to be deleted.
 * @throws {Error} Throws an error if the API request fails.
 */
export async function deletePost(postId) {
    if (!postId) {
        console.error("❌ DELETE requires a valid post ID.");
        return;
    }
    
    const deleteUrl = `${API_SOCIAL_URL}/posts/${postId}`;

    try {
        const response = await authFetch(deleteUrl, { method: "DELETE" });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors?.[0]?.message || `HTTP error! Status: ${response.status}`);
        }

        const postElement = document.querySelector(`[data-post-id="${postId}"]`);
        if (postElement) {
            postElement.classList.add("fade-out"); 
            setTimeout(() => postElement.remove(), 500); 
        }

        showDeleteConfirmation();
    } catch (error) {
        console.error("❌ Error deleting post:", error);
        alert("Error deleting post: " + error.message);
    }
}

/**
 * Displays a visual confirmation message after a post is deleted.
 * The message disappears after 2 seconds, and the page reloads automatically.
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
