export function postTemplateA(postData){
    return `<div class="post" id=${postData.id}>${postData.title}</div>`;
}


export function renderPostTemplateB(postData){
    const post = document.createElement('div');
    post.classList.add("post");
    post.innerText = postData.title;
    const button = document.createElement('button');
    post.appendChild(button);

    button.addEventListener('click', () => {    
        console.log(postData);
    });
    return post;
}

export function renderPostTemplateC(postData, parent){
    /* parentElement.innerHTML = postTemplate(postData); */

    parent.append(postTemplateB(postData));
}