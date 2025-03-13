import { setRegisterFormListener } from "./handlers/register.mjs";
import { setloginFormListener } from "./handlers/login.mjs";
import { setCreatePostFormListener } from "./handlers/createPost.mjs";
import { setUpdatePostListener } from "./handlers/updatePost.mjs";
import { displayProfile } from "./handlers/profile.mjs";
import { getPosts } from "./api/posts/read.mjs"; // Henter innlegg

console.log("🚀 index.mjs is running!");

const path = window.location.pathname;
console.log("🌍 Current path:", path);

// Sjekker om `path` er lik forventet
if (path === "/feed/index.html") {
    console.log("✅ Direkt match med `/feed/index.html`");
} else if (path.startsWith("/feed")) {
    console.log("✅ Path starter med `/feed`");
} else {
    console.log("❌ Ingen match for feed path.");
}

if (path.includes("register.html")) {
    console.log("🟢 Initializing register form...");
    setRegisterFormListener();
} else if (path === "/" || path.includes("index.html")) {
    console.log("🟢 Initializing login form...");
    setloginFormListener();
} else if (path.includes("/profile")) { 
    console.log("🟢 Loading profile...");
    displayProfile();
} 

// Midlertidig hardkodet test for å se om feilen ligger i `path.startsWith("/feed/")`
if (true) {  // Endre tilbake til `path.startsWith("/feed/")` hvis dette fungerer
    console.log("🟢 Hardkodet test: Feed laster...");

    console.log("🟢 Kaller setCreatePostFormListener()...");
    setCreatePostFormListener(); 

    console.log("🟢 Kaller setUpdatePostListener()...");
    setUpdatePostListener(); 

    console.log("📡 Henter innlegg fra API...");
    getPosts()
        .then(posts => {
            console.log("✅ API returnerte innlegg:", posts);
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
                        <a href="/feed/index.html?id=${post.id}" class="btn btn-primary">Edit</a>
                        <button class="btn btn-danger delete-post" data-id="${post.id}">Delete</button>
                    </div>
                `;

                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error("❌ Kunne ikke hente innlegg:", error);
        });
}


    
    
    

    
