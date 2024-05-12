export function setupFormToggle(loginForm, registerForm, toggleFormBtn) {
    toggleFormBtn.addEventListener('click', () => {
        if (loginForm.style.display !== 'none') {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            toggleFormBtn.innerText = 'Vis Innlogging';
        } else {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            toggleFormBtn.innerText = 'Vis Registrering';
        }
    });
}

export function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    console.log('Login Attempt with:', profile);

    login(profile)
        .then(response => {
            console.log('Login Success:', response);
            
        })
        .catch(error => {
            console.error('Login Failed:', error);
            
        });
}

export function handleRegister(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    console.log("Registreringsdata:", profile);
}
