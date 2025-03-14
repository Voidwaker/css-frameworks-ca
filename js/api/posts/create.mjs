import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/posts";
const method = "POST";  

export async function createPost(postData) {
    const createPostUrl = `${API_SOCIAL_URL}${action}`;

    console.log("📡 Prøver å opprette innlegg:", postData);

    if (postData.tags && typeof postData.tags === "string") {
        postData.tags = postData.tags.split(',').map(tag => tag.trim());
    }

    if (!Array.isArray(postData.tags)) {
        postData.tags = [];
    }

    if (postData.media && typeof postData.media === "string" && postData.media.trim() !== "") {
        postData.media = { url: postData.media.trim(), alt: "Post image" };
    } else {
        postData.media = null; 
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

        const post = await response.json();
        console.log("✅ Innlegg opprettet:", post);
        return post;
    } catch (error) {
        console.error("❌ Feil ved opprettelse av innlegg:", error); 
        throw error;
    }
}








