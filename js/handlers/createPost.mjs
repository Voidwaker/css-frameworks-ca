import { createPost } from "../api/posts/create.mjs";

export function setCreatePostFormListener() {
    console.log("🟢 Kjørte setCreatePostFormListener()");
    const form = document.querySelector("#createPost");

    if (!form) {
        console.error("❌ Skjema ikke funnet!");
        return;
    }

    console.log("✅ Fant skjemaet for å lage innlegg.");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        console.log("🟢 Skjema sendt! Henter data...");
        const formData = new FormData(event.target);
        const post = Object.fromEntries(formData.entries());

        if (post.tags) {
            post.tags = post.tags.split(",").map(tag => tag.trim());
        } else {
            post.tags = [];
        }

        console.log("📡 Sender innlegg til API:", post);

        try {
            const response = await createPost(post);
            console.log("✅ Innlegg opprettet:", response);
            alert("Post created successfully");
            window.location.reload();
        } catch (error) {
            console.error("❌ Feil ved opprettelse av innlegg:", error);
            alert("Error creating post: " + error.message);
        }
    });
}










