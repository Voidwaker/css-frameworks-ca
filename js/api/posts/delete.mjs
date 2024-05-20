import { API_SOCIAL_URL } from "../constants.mjs";

import { authFetch } from "../auth/authFetch.mjs";

const action = "/posts";
const method = "delete";

export async function removePost(id) {

if (!id) {
    throw new Error("DELETE REQUIRES Post ID");

}
    const removePostUrl = `${API_SOCIAL_URL}${action}/${id}`;

    const response = await authFetch(removePostUrl, {
        method
})

return await response.json();
}