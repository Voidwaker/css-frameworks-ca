import { setRegisterFormListener } from "./handlers/register.mjs";
import { setloginFormListener } from "./handlers/login.mjs";
import { setCreatePostFormListener } from "./handlers/createPost.mjs";
import { setUpdatePostListener } from "./handlers/updatePost.mjs";
import { displayProfile } from "./handlers/profile.mjs";
import { getPosts } from "./api/posts/read.mjs";
import { logout } from "./handlers/logout.mjs";
import * as storage from "./storage/index.mjs";

console.log("🚀 index.mjs is running!");

const path = window.location.pathname;

setTimeout(() => {
    const token = storage.load("token");

    const restrictedPages = ["/feed/index.html", "/profile/index.html"];
    if (restrictedPages.includes(path) && !token) {
        console.warn("⛔ Access denied! Redirecting to login...");

        document.body.innerHTML = `
            <div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background-color: red; color: white; padding: 10px; border-radius: 5px; z-index: 1000;">
                ❌ You must be logged in to access this page! Redirecting...
            </div>
        `;

        setTimeout(() => {
            window.location.href = "/index.html";
        }, 1000);

        throw new Error("Unauthorized access: Redirecting...");
    }
}, 100); 

if (path.includes("register.html")) {
    setRegisterFormListener();
} else if (path === "/" || path.includes("index.html")) {
    setloginFormListener();
} else if (path.includes("/profile")) {
    displayProfile();
}

if (path.includes("/feed")) {
    setCreatePostFormListener();
    setUpdatePostListener();

    getPosts()
        .then(posts => {
            if (!Array.isArray(posts)) {
                console.error("❌ Feil: posts er ikke en array", posts);
                return;
            }
            posts.sort((a, b) => new Date(b.created) - new Date(a.created));

            const postsContainer = document.getElementById("posts");
            if (!postsContainer) {
                console.warn("⚠ Ingen #posts-container funnet.");
                return;
            }

            postsContainer.innerHTML = "";
            posts.forEach(post => {
                const createdAt = new Date(post.created);
                const formattedDate = isNaN(createdAt.getTime()) ? "Invalid date" : createdAt.toLocaleString();

                const postElement = document.createElement("div");
                postElement.className = "card mb-3";
                postElement.innerHTML = `
                    <div class="card-body text-green">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.body}</p>
                        ${post.media?.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post image'}" class="img-fluid"/>` : ""}
                        <p class="card-text"><small class="text-muted">Posted by: ${post.author?.name || "Unknown"} on ${formattedDate}</small></p>
                    </div>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error("❌ Kunne ikke hente innlegg:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutBtn");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            logout();
            window.location.href = "/index.html";
        });
    }
});


    
    

    
