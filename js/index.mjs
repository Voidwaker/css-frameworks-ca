import { setRegisterFormListener } from './handlers/register.mjs'; 
import { setLoginFormListener } from './handlers/login.mjs';

const path = location.pathname;

if (path === '/') {
    setLoginFormListener();
} else if (path === '/') {
    setRegisterFormListener();
}



import { setupFormToggle, handleLogin, handleRegister } from './api/form/index.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toggleFormBtn = document.getElementById('toggleFormBtn');
    
    setupFormToggle(loginForm, registerForm, toggleFormBtn);

    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
});
