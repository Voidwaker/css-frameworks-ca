import { setRegisterFormListener } from './handlers/register.mjs'; 
import { setLoginFormListener } from './handlers/login.mjs';
import { login } from './api/auth/login.mjs';

const path = location.pathname;

if (path === '/index.html') {
    setLoginFormListener();
} else if (path === '/profile.html') {
    setRegisterFormListener();
}



import { /* setupFormToggle, */ handleLogin, handleRegister } from './api/form/index.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
   /*  const toggleFormBtn = document.getElementById('toggleFormBtn'); */
    
    /* setupFormToggle(loginForm, registerForm, toggleFormBtn); */

    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
});
