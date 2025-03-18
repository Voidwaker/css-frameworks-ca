import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

/**
 * Deletes a post with the provided ID.
 * @param {string} postId - ID of the post to delete.
 * @returns {Promise<void>}
 */
export async function deletePost(postId) {
    if (!postId) {
        throw new Error("❌ DELETE krever en gyldig post-ID.");
    }
    
    const deleteUrl = `${API_SOCIAL_URL}/posts/${postId}`;
    console.log(`🗑️ Prøver å slette innlegg: ${deleteUrl}`);

    try {
        const response = await authFetch(deleteUrl, { method: "DELETE" });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors?.[0]?.message || `HTTP error! status: ${response.status}`);
        }

        console.log("✅ Innlegg slettet!");
    } catch (error) {
        console.error("❌ Feil ved sletting av innlegg:", error);
        throw error;
    }
}

