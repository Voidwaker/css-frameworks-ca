import { setRegisterFormListener } from "./handlers/register.mjs";
import { setloginFormListener } from "./handlers/login.mjs";
import { setCreatePostFormListener } from "./handlers/createPost.mjs";
import { setUpdatePostListener } from "./handlers/updatePost.mjs"; 
import * as post from "./api/posts/index.mjs";
import * as listeners from "./handlers/index.mjs";

const path = location.pathname;

if (path === "/register.html") {
    setRegisterFormListener();
} else if (path === "/") {
    setloginFormListener();
} else if (path === "/feed/index.html") {
    setCreatePostFormListener(); 
    setUpdatePostListener(); 

    function displayPosts(posts) {
        const postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const createdAt = new Date(post.created);
            const formattedDate = isNaN(createdAt.getTime()) ? 'Invalid date' : createdAt.toLocaleString();

            const postElement = document.createElement('div');
            postElement.className = 'card mb-3';

            postElement.innerHTML = `
                <div class="card-body text-green">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                    <p class="card-text"><small class="text-muted">Posted on: ${formattedDate}</small></p>
                    <a href="/feed/index.html?id=${post.id}" class="btn btn-primary">Edit</a>
                    <button class="btn btn-danger delete-post" data-id="${post.id}">Delete</button>
                </div>
            `;

            postsContainer.appendChild(postElement);
        });

        document.querySelectorAll('.delete-post').forEach(button => {
            button.addEventListener('click', function() {
                const postId = this.getAttribute('data-id');
                post.removePost(postId)
                    .then(response => {
                        alert('Post deleted successfully');
                        location.reload();
                    })
                    .catch(error => {
                        console.error('Error deleting post:', error);
                        alert('Error deleting post: ' + error.message);
                    });
            });
        });
    }

    post.getPosts().then(posts => {
        posts.sort((a, b) => new Date(b.created) - new Date(a.created)); 
        displayPosts(posts);
    }).catch(console.error);

    document.getElementById('filterPosts').addEventListener('change', function(event) {
        const filter = event.target.value;
        post.getPosts()
            .then(posts => {
                let sortedPosts;
                if (filter === 'newest') {
                    sortedPosts = posts.sort((a, b) => new Date(b.created) - new Date(a.created));
                } else if (filter === 'oldest') {
                    sortedPosts = posts.sort((a, b) => new Date(a.created) - new Date(b.created));
                }
                displayPosts(sortedPosts);
            })
            .catch(console.error);
    });

    document.getElementById('searchPosts').addEventListener('input', function(event) {
        const query = event.target.value.toLowerCase();
        post.getPosts()
            .then(posts => {
                const filteredPosts = posts.filter(post => 
                    post.title && post.title.toLowerCase().includes(query)
                );
                displayPosts(filteredPosts);
            })
            .catch(console.error);
    });
}


  

    
    
    

    
