import { setRegisterFormListener } from "./handlers/register.mjs";
import { setloginFormListener } from "./handlers/login.mjs";
import { setCreatePostFormListener } from "./handlers/createPost.mjs";
import { setUpdatePostListener } from "./handlers/updatePost.mjs";
import { displayProfile } from "./handlers/profile.mjs";
import { getPosts } from "./api/posts/read.mjs";

const path = window.location.pathname;

if (path === "/feed/index.html") {

} else if (path.startsWith("/feed")) {

} else {
    
}

if (path.includes("register.html")) {
    setRegisterFormListener();
} else if (path === "/" || path.includes("index.html")) {
    setloginFormListener();
} else if (path.includes("/profile")) { 
    displayProfile();
}

if (true) {  
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

    
    
    

    
