const form = document.querySelector('form');

form.addEventListener("submit", (event) => { 
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const profile= object.fromEntries(formData.entries());
    console.log(profile);
});