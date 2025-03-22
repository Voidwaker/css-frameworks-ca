import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/posts";
const method = "POST";

/**
 * Creates a new post and sends it to the API.
 *
 * @async
 * @param {Object} postData - The post data to be created.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.body - The content/body of the post.
 * @param {Array<string>|string} [postData.tags] - Optional tags (comma-separated string or array).
 * @param {Object} [postData.media] - Optional media object.
 * @param {string} postData.media.url - The media URL.
 * @param {string} [postData.media.alt] - Alt text for the media.
 * @returns {Promise<Object>} The created post data from the API.
 * @throws {Error} If the API request fails.
 *
 * @example
 * await createPost({
 *   title: "My New Post",
 *   body: "This is the content of the post.",
 *   tags: "js,code,project",
 *   media: { url: "https://example.com/image.jpg", alt: "My image" }
 * });
 */
export async function createPost(postData) {
    const createPostUrl = `${API_SOCIAL_URL}${action}`;

    // Ensure tags is an array
    if (postData.tags && typeof postData.tags === "string") {
        postData.tags = postData.tags.split(',').map(tag => tag.trim());
    }
    if (!Array.isArray(postData.tags)) {
        postData.tags = [];
    }

    // Clean up media object
    if (postData.media && typeof postData.media === "object" && postData.media.url) {
        postData.media = {
            url: postData.media.url.trim(),
            alt: postData.media.alt || "User uploaded image"
        };
    } else {
        delete postData.media;
    }

    try {
        const response = await authFetch(createPostUrl, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, ${error.errors?.[0]?.message || "Unknown error"}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error creating post:", error);
        throw error;
    }
}












