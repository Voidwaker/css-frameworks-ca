import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/posts";
const method = "PUT";

/**
 * Updates a post with the provided data.
 *
 * @async
 * @param {Object} postData - The data for the post to update.
 * @param {string} postData.id - The ID of the post to update.
 * @param {string} postData.title - The new title of the post.
 * @param {string} postData.body - The new body content of the post.
 * @param {Object|null} [postData.media] - Optional media object with `url` and `alt`.
 * @returns {Promise<Object>} A promise that resolves to the updated post data.
 * @throws {Error} Throws an error if the update fails.
 *
 * @example
 * const updatedPost = await updatePost({
 *   id: "123",
 *   title: "New Title",
 *   body: "Updated body content",
 *   media: { url: "https://example.com/image.jpg", alt: "Updated image" }
 * });
 * console.log(updatedPost);
 */
export async function updatePost(postData) {
    if (!postData.id) {
        throw new Error("Post ID is required!");
    }

    const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id}`;

    const response = await authFetch(updatePostURL, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.message || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
}

