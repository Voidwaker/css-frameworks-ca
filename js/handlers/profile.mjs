import { getProfile } from "../api/profile/getProfile.mjs";

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
                <p class="card-text"><small class="text-muted">Created: ${new Date(post.created).toLocaleDateString()}</small></p>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}
