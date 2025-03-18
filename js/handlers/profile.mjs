import { getProfile } from "../api/profile/getProfile.mjs";
import { deletePost } from "../api/posts/delete.mjs"; 
import { load } from "../storage/index.mjs";

export async function displayProfile() {
    console.log("🔵 displayProfile() called!");

    const profile = await getProfile();

    if (!profile) {
        console.error("❌ Ingen profildata tilgjengelig.");
        return;
    }

    console.log("✅ Profildata hentet:", profile);

    document.getElementById("profile-username").textContent = `@${profile.name}`;
    document.getElementById("profile-avatar").src = profile.avatar?.url || "https://via.placeholder.com/150";
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
                <button class="btn btn-primary edit-post" data-id="${post.id}">Edit</button>
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
            console.log(`✏️ Redigerer innlegg med ID: ${postId}`);

            window.location.href = `/edit-post.html?id=${postId}`; 
        });
    });
}

displayProfile();
