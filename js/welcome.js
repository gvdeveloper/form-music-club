/* let userLogin = document.getElementById('userLogin'); */

document.addEventListener('DOMContentLoaded', () =>{
    if (localStorage.getItem('userLogin')) {
        userLogin = JSON.parse(localStorage.getItem('userLogin'));
        document.getElementById('userLogin').textContent = userLogin;
    } else{
        document.getElementById('userLogin').textContent = "";
    }

    
})