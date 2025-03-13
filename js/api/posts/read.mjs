import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/posts";

export async function getPosts() {
    const getPostsUrl = `${API_SOCIAL_URL}${action}?_author=true&_comments=true&_reactions=true`;

    console.log("📡 Henter alle innlegg fra:", getPostsUrl);

    try {
        const response = await authFetch(getPostsUrl);
        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ Feil ved henting av innlegg:", errorData);
            throw new Error(errorData.errors?.[0]?.message || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // ✅ Hent kun `data`-arrayen
        const posts = result.data;

        if (!Array.isArray(posts)) {
            console.error("❌ Feil: posts er ikke en array", posts);
            return [];
        }

        console.log("✅ Innlegg hentet:", posts);
        return posts;
    } catch (error) {
        console.error("❌ Kunne ikke hente innlegg:", error);
        return [];
    }
}

export async function getPost(id) {
    if (!id) {
        throw new Error("get requires Post ID");
    }

    const getPostUrl = `${API_SOCIAL_URL}${action}/${id}?_author=true&_comments=true&_reactions=true`;

    console.log("📡 Henter innlegg med ID:", id);

    try {
        const response = await authFetch(getPostUrl);
        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ Feil ved henting av enkeltinnlegg:", errorData);
            throw new Error(errorData.errors?.[0]?.message || `HTTP error! status: ${response.status}`);
        }

        const post = await response.json();
        console.log("✅ Enkeltinnlegg hentet:", post);
        return post;
    } catch (error) {
        console.error("❌ Kunne ikke hente innlegg:", error);
        return null;
    }
}


