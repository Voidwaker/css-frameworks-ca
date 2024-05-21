import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/posts";
const method = "put";

/**
 * Updates a post with the provided data.
 * 
 * @param {Object} postData - The data for the post to update.
 * @param {string} postData.id - The ID of the post to update.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.body - The body of the post.
 * @param {Array<string>} [postData.tags] - The tags for the post.
 * @param {string} [postData.media] - The media URL for the post.
 * @returns {Promise<Object>} The updated post data.
 */
export async function updatePost(postData) {
    if (!postData.id) {
        throw new Error("Post ID is required");
    }

    const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id}`;
    const response = await authFetch(updatePostURL, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from API:', JSON.stringify(errorData, null, 2));
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}
