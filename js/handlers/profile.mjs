import { getProfile } from "../api/profile/getProfile.mjs";
import { deletePost } from "../api/posts/delete.mjs"; 
import { load } from "../storage/index.mjs";
import { updatePost } from "../api/posts/update.mjs"; // Import for oppdatering

export async function displayProfile() {
    console.log("🔵 displayProfile() called!");

    const profile = await getProfile();

    if (!profile) {
        console.error("❌ Ingen profildata tilgjengelig.");
        return;
    }

    console.log("✅ Profildata hentet:", profile);

    document.getElementById("profile-username").textContent = `@${profile.name}`;
    document.getElementById("profile-avatar").src = profile.avatar?.url || "/assets/default-avatar.jpg";
    document.getElementById("profile-bio").textContent = profile.bio || "No bio available";
    document.getElementById("profile-followers").textContent = profile._count?.followers || "0";
    document.getElementById("profile-following").textContent = profile._count?.following || "0";

    displayUserPosts(profile.posts);
}

function displayUserPosts(posts) {
    const postsContainer = document.getElementById("user-posts");
    postsContainer.innerHTML = "";

    if (!posts || posts.length === 0) {
        postsContainer.innerHTML = "<p class='text-green'>No posts yet.</p>";
        return;
    }

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "card mb-3";
        postElement.innerHTML = `
            <div class="card-body text-green">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.body}</p>
                ${post.media?.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post image'}" class="img-fluid"/>` : ""}
                <p class="card-text"><small class="text-muted">Created: ${new Date(post.created).toLocaleDateString()}</small></p>
                <button class="btn btn-primary edit-post" data-id="${post.id}" data-title="${post.title}" data-body="${post.body}" data-media="${post.media?.url || ""}">Edit</button>
                <button class="btn btn-danger delete-post" data-id="${post.id}">Delete</button>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });

    document.querySelectorAll(".delete-post").forEach(button => {
        button.addEventListener("click", async function() {
            const postId = this.getAttribute("data-id");
            console.log(`🗑️ Sletter innlegg med ID: ${postId}`);

            try {
                await deletePost(postId);
                alert("Post deleted successfully!");
                displayUserPosts(posts.filter(p => p.id !== postId)); 
            } catch (error) {
                console.error("❌ Feil ved sletting av innlegg:", error);
            }
        });
    });

    document.querySelectorAll(".edit-post").forEach(button => {
        button.addEventListener("click", function() {
            const postId = this.getAttribute("data-id");
            const title = this.getAttribute("data-title");
            const body = this.getAttribute("data-body");
            const media = this.getAttribute("data-media");

            console.log(`✏️ Åpner redigeringsmodal for post ID: ${postId}`);

            document.getElementById("editPostId").value = postId;
            document.getElementById("editTitle").value = title;
            document.getElementById("editBody").value = body;
            document.getElementById("editMedia").value = media;

            const editModal = new bootstrap.Modal(document.getElementById("editPostModal"));
            editModal.show();
        });
    });

    document.getElementById("saveEdit").addEventListener("click", async function() {
        const postId = document.getElementById("editPostId").value;
        const title = document.getElementById("editTitle").value;
        const body = document.getElementById("editBody").value;
        const media = document.getElementById("editMedia").value;

        console.log(`💾 Lagrer oppdatering for post ID: ${postId}`);

        try {
            await updatePost({ id: postId, title, body, media: media ? { url: media, alt: "Updated post image" } : null });
            alert("Post updated successfully!");
            displayProfile();
            bootstrap.Modal.getInstance(document.getElementById("editPostModal")).hide();
        } catch (error) {
            console.error("❌ Feil ved oppdatering av innlegg:", error);
        }
    });
}

displayProfile();

