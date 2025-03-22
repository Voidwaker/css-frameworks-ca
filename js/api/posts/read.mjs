import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/posts";

/**
 * Fetches all posts including author, comments, and reactions.
 *
 * @async
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of posts, or an empty array if it fails.
 *
 * @example
 * const posts = await getPosts();
 * console.log(posts);
 */
export async function getPosts() {
    const getPostsUrl = `${API_SOCIAL_URL}${action}?_author=true&_comments=true&_reactions=true`;

    try {
        const response = await authFetch(getPostsUrl);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors?.[0]?.message || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return Array.isArray(result.data) ? result.data : [];
    } catch (error) {
        return [];
    }
}

/**
 * Fetches a single post by its ID including author, comments, and reactions.
 *
 * @async
 * @param {string} id - The ID of the post to fetch.
 * @returns {Promise<Object|null>} A promise that resolves to the post object or null if it fails.
 *
 * @throws {Error} If ID is not provided.
 *
 * @example
 * const post = await getPost("123");
 * console.log(post.title);
 */
export async function getPost(id) {
    if (!id) {
        throw new Error("getPost requires a Post ID");
    }

    const getPostUrl = `${API_SOCIAL_URL}${action}/${id}?_author=true&_comments=true&_reactions=true`;

    try {
        const response = await authFetch(getPostUrl);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors?.[0]?.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        return null;
    }
}


