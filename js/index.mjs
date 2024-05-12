import { setRegisterFormListener } from './handlers/register.mjs'; 
setRegisterFormListener();



import { setupFormToggle, handleLogin, handleRegister } from './api/form/index.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toggleFormBtn = document.getElementById('toggleFormBtn');
    
    setupFormToggle(loginForm, registerForm, toggleFormBtn);

    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
});
