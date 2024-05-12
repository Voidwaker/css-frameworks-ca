import * as constants from './api/constants.mjs';

console.log(constants.API_SOCIAL_URL);


import { setupFormToggle, handleLogin, handleRegister } from './api/form/index.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toggleFormBtn = document.getElementById('toggleFormBtn');
    
    setupFormToggle(loginForm, registerForm, toggleFormBtn);

    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
});
