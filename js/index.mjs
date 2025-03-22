import { setRegisterFormListener } from "./handlers/register.mjs";
import { setloginFormListener } from "./handlers/login.mjs";
import { setCreatePostFormListener } from "./handlers/createPost.mjs";
import { setUpdatePostListener } from "./handlers/updatePost.mjs";
import { displayProfile } from "./handlers/profile.mjs";
import { getPosts, getPost } from "./api/posts/read.mjs";
import { updatePost } from "./api/posts/update.mjs";
import { logout } from "./handlers/logout.mjs";
import * as storage from "./storage/index.mjs";

const path = window.location.pathname;
const loggedInUser = storage.load("profile")?.name;
let allPosts = [];

/**
 * Redirects user if trying to access a protected route without being logged in.
 */
const token = storage.load("token");
const restrictedPages = ["/feed/index.html", "/profile/index.html"];

if (restrictedPages.includes(path) && !token) {
	document.body.innerHTML = `
		<div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background-color: red; color: white; padding: 10px; border-radius: 5px; z-index: 1000;">
			❌ You must be logged in to access this page! Redirecting...
		</div>
	`;

	setTimeout(() => {
		window.location.href = "/index.html";
	}, 1000);
} else {
	if (path.includes("register.html")) {
		setRegisterFormListener();
	} else if (path === "/" || path.includes("index.html")) {
		setloginFormListener();
	} else if (path.includes("/profile")) {
		displayProfile();
	}

	if (path.includes("/feed") || path.includes("/profile")) {
		setCreatePostFormListener();
		setUpdatePostListener();

		getPosts()
			.then(posts => {
				if (!Array.isArray(posts)) {
					console.error("❌ Feil: posts er ikke en array", posts);
					return;
				}
				allPosts = posts;
				renderPosts(allPosts);
				initSearchAndFilter();
			})
			.catch(error => {
				console.error("❌ Kunne ikke hente innlegg:", error);
			});
	}
}

/**
 * Renders posts to the page.
 * @param {Array<Object>} posts - Array of post objects to render.
 */
function renderPosts(posts) {
	const postsContainer = document.getElementById("posts");
	if (!postsContainer) return;

	postsContainer.innerHTML = "";
	const isProfilePage = path.includes("/profile");

	posts.forEach(post => {
		const createdAt = new Date(post.created);
		const formattedDate = isNaN(createdAt.getTime()) ? "Invalid date" : createdAt.toLocaleString();
		const isOwner = post.author?.name === loggedInUser;

		const editDeleteButtons = isProfilePage && isOwner
			? `<button class="btn btn-primary edit-post" data-id="${post.id}" data-title="${post.title}" data-body="${post.body}" data-media="${post.media?.url || ''}">Edit</button>
			   <button class="btn btn-danger delete-post" data-id="${post.id}">Delete</button>`
			: "";

		const postElement = document.createElement("div");
		postElement.className = "card mb-3";
		postElement.innerHTML = `
			<div class="card-body text-green">
				<h5 class="card-title">${post.title}</h5>
				<p class="card-text">${post.body}</p>
				${post.media?.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post image'}" class="img-fluid"/>` : ""}
				<p class="card-text"><small class="text-muted">Posted by: ${post.author?.name || "Unknown"} on ${formattedDate}</small></p>
				<button class="btn btn-outline-info view-post" data-id="${post.id}">View</button>
				${editDeleteButtons}
			</div>
		`;
		postsContainer.appendChild(postElement);
	});

	document.querySelectorAll(".view-post").forEach(button => {
		button.addEventListener("click", openViewModal);
	});

	if (isProfilePage) {
		document.querySelectorAll(".edit-post").forEach(button => {
			button.addEventListener("click", openEditModal);
		});
	}
}

/**
 * Initializes listeners for the search and filter inputs.
 */
function initSearchAndFilter() {
	const searchInput = document.getElementById("searchPosts");
	const filterSelect = document.getElementById("filterPosts");

	if (searchInput) {
		searchInput.addEventListener("input", filterAndRender);
	}
	if (filterSelect) {
		filterSelect.addEventListener("change", filterAndRender);
	}
}

/**
 * Filters and sorts the list of posts and re-renders the result.
 */
function filterAndRender() {
	const searchValue = document.getElementById("searchPosts")?.value?.toLowerCase() || "";
	const filterValue = document.getElementById("filterPosts")?.value || "newest";

	let filteredPosts = allPosts.filter(post =>
		post.title.toLowerCase().includes(searchValue) ||
		post.body?.toLowerCase().includes(searchValue)
	);

	switch (filterValue) {
		case "oldest":
			filteredPosts.sort((a, b) => new Date(a.created) - new Date(b.created));
			break;
		case "newest":
			filteredPosts.sort((a, b) => new Date(b.created) - new Date(a.created));
			break;
		case "popular":
			filteredPosts.sort((a, b) => (b._count?.reactions || 0) - (a._count?.reactions || 0));
			break;
	}

	renderPosts(filteredPosts);
}

/**
 * Opens modal and displays full post content.
 * @param {Event} event
 */
async function openViewModal(event) {
	const postId = event.target.getAttribute("data-id");
	const post = await getPost(postId);
	if (!post) return;

	document.getElementById("viewPostTitle").textContent = post.title;
	document.getElementById("viewPostBody").textContent = post.body;
	document.getElementById("viewPostAuthor").textContent = post.author?.name || "Unknown";
	document.getElementById("viewPostDate").textContent = new Date(post.created).toLocaleString();

	const mediaContainer = document.getElementById("viewPostMedia");
	mediaContainer.innerHTML = post.media?.url
		? `<img src="${post.media.url}" class="img-fluid" alt="${post.media.alt || 'Post image'}">`
		: "";

	const modal = new bootstrap.Modal(document.getElementById("viewPostModal"));
	modal.show();
}

/**
 * Fills and opens the modal with data from the selected post.
 * @param {Event} event - The click event from the Edit button.
 */
function openEditModal(event) {
	const button = event.target;
	document.getElementById("editPostId").value = button.getAttribute("data-id");
	document.getElementById("editPostTitle").value = button.getAttribute("data-title");
	document.getElementById("editPostBody").value = button.getAttribute("data-body");
	document.getElementById("editPostMedia").value = button.getAttribute("data-media");

	const editModal = new bootstrap.Modal(document.getElementById("editPostModal"));
	editModal.show();
}

document.addEventListener("DOMContentLoaded", () => {
	const editPostForm = document.getElementById("editPostForm");

	if (editPostForm) {
		editPostForm.addEventListener("submit", async (event) => {
			event.preventDefault();

			const postId = document.getElementById("editPostId").value;
			const title = document.getElementById("editPostTitle").value;
			const body = document.getElementById("editPostBody").value;
			const media = document.getElementById("editPostMedia").value;

			const updatedPost = {
				id: postId,
				title,
				body,
				media: media ? { url: media, alt: "Updated post image" } : null,
			};

			try {
				await updatePost(updatedPost);
				alert("Post updated successfully!");
				bootstrap.Modal.getInstance(document.getElementById("editPostModal")).hide();
				window.location.reload();
			} catch (error) {
				alert("Error updating post: " + error.message);
			}
		});
	}

	const logoutButton = document.getElementById("logoutBtn");
	if (logoutButton) {
		logoutButton.addEventListener("click", () => {
			logout();
			window.location.href = "/index.html";
		});
	}
});


    

    
