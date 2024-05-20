import { setRegisterFormListener } from "./handlers/register.mjs";
import { setloginFormListener } from "./handlers/login.mjs";
import * as post from "./api/posts/index.mjs";

    const path = location.pathname;

    if (path === "/register.html") {
        setRegisterFormListener();
    } else if (path === "/") {
        setloginFormListener();
    }
    
    if (path === "/feed/index.html") {
        post.getPosts()
            .then(posts => {
                console.log(posts);
    
            
                const postsContainer = document.getElementById('postsContainer');
    
                
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'card mb-3';
    
                    postElement.innerHTML = `
                        <div class="card-body text-green">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.body}</p>
                        </div>
                    `;
    
                    postsContainer.appendChild(postElement);
                });

            })
            .catch(console.error);
    }
    //post.createPost()
    //post.updatePost()
    //post.removePost()
    //post.getPost()

