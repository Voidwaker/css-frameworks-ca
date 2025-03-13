import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/posts";
const method = "POST";  

export async function createPost(postData) {
    const createPostUrl = `${API_SOCIAL_URL}${action}`;

    console.log("🟢 Prøver å opprette innlegg:", postData);

    // Sørg for at API-et får riktig JSON-format
    const payload = {
        title: postData.title,
        body: postData.body || "", // API krever ikke body, men det er best å sende en tom string hvis den mangler
        tags: postData.tags ? postData.tags.split(",").map(tag => tag.trim()) : [], // Konverter tags til array
        media: postData.mediaUrl ? { url: postData.mediaUrl, alt: postData.mediaAlt || "Bilde" } : undefined
    };

    console.log("📡 Payload som sendes til API:", payload);

    try {
        const response = await authFetch(createPostUrl, {
            method,
            body: JSON.stringify(payload)
        });

        console.log("📡 API respons mottatt:", response);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ API-feil:", errorData);
            throw new Error(errorData.errors?.[0]?.message || `HTTP error! status: ${response.status}`);
        }

        const post = await response.json();
        console.log("✅ Innlegg opprettet:", post);
        return post;
    } catch (error) {
        console.error("❌ Feil under opprettelse av innlegg:", error);
        throw error;
    }
}








