import { API_SOCIAL_URL } from "../constants.mjs";

import { authFetch } from "../auth/authFetch.mjs";

const action = "/posts";
const method = "put";

export async function updatePost(postData) {

if (!postData.id) {
    throw new Error("Post ID is required");

}
    const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id}`;

    const response = await authFetch(updatePostURL, {
        method,
        body: JSON.stringify(postData)
})

return await response.json();
}