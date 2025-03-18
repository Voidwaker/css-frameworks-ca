import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/posts";
const method = "POST";  

/**
 * Creates a new post and sends it to the API.
 * @param {Object} postData - The post data containing title, body, tags, and media.
 * @returns {Promise<Object>} The created post data.
 * @throws {Error} If the API request fails.
 */
export async function createPost(postData) {
    const createPostUrl = `${API_SOCIAL_URL}${action}`;

    console.log("📡 Preparing to create post:", postData);

    if (postData.tags && typeof postData.tags === "string") {
        postData.tags = postData.tags.split(',').map(tag => tag.trim());
    }

    if (!Array.isArray(postData.tags)) {
        postData.tags = [];
    }

    // Validate media field
    if (postData.media && typeof postData.media === "object" && postData.media.url) {
        postData.media = { url: postData.media.url.trim(), alt: postData.media.alt || "User uploaded image" };
    } else {
        delete postData.media;
    }

    console.log("📡 Final payload sent to API:", JSON.stringify(postData, null, 2));

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

        const post = await response.json();
        console.log("✅ Post created:", post);
        return post;
    } catch (error) {
        console.error("❌ Error creating post:", error);
        throw error;
    }
}












