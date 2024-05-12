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
    console.log('Login Attempt');
}

export function handleRegister(event) {
    event.preventDefault();
    console.log('Register Attempt');
}
