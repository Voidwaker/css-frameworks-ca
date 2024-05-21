import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/posts";

export async function getPosts() {
    const updatePostsUrl = `${API_SOCIAL_URL}${action}`;
    const response = await authFetch(updatePostsUrl);
    return await response.json();
}

export async function getPost(id) {
    if (!id) {
        throw new Error("get requires Post ID");
    }
    const getPostsUrl = `${API_SOCIAL_URL}${action}/${id}`;
    const response = await authFetch(getPostsUrl);
    return await response.json();
}
