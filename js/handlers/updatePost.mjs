import { updatePost } from "../api/posts/update.mjs";

/**
 * Sets up an event listener for the update form.
 * 
 * This function locates a form with the ID `editPost` and attaches a `submit` event listener to it.
 * When the form is submitted, the function retrieves the post ID from the URL, gathers the data from the form,
 * and sends a request to update the post. If the update is successful, a success message is displayed.
 * If an error occurs, an error message is displayed.
 * 
 * @example
 * 
 * // Expected URL format: http://example.com/edit.html?id=123
 * 
 * <form id="editPost">
 *   <input name="title" type="text" />
 *   <textarea name="body"></textarea>
 *   <button type="submit">Update Post</button>
 * </form>
 * 
 * // JavaScript
 * setUpdatePostListener();
 */
export function setUpdatePostListener() {
    console.log("setUpdatePostListener called"); 
    const form = document.querySelector("#editPost");
    console.log("Form found:", form); 

    const url = new URL(location.href);
    const id = url.searchParams.get("id");
    console.log("Post ID from URL:", id); 

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries());
            post.id = id;

            if (!post.id) {
                console.error("Post ID is missing!");
                alert("Post ID is required.");
                return;
            }

            console.log('Updating post with data:', post); 
            updatePost(post)
                .then(response => {
                    console.log('Post updated successfully:', response); 
                    alert("Post updated successfully!");
                })
                .catch(error => {
                    console.error('Error updating post:', error);
                    alert("Error updating post: " + error.message);
                });
        });
    } else {
        console.error('Form not found!');
    }
}


