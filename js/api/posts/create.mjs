import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/posts";
const method = "POST";  

export async function createPost(postData) {
    const createPostUrl = `${API_SOCIAL_URL}${action}`;

    try {
        const response = await authFetch(createPostUrl, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const post = await response.json();
        return post;
    } catch (error) {
        console.error('Error creating post:', error); 
        throw error;
    }
}






