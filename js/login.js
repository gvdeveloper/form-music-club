const form = document.getElementById('form');
const inputs = document.querySelectorAll('.formInput');

const userEmail = document.getElementById('userEmail');

const groupEmail = document.getElementById('groupEmail');
const groupPassword = document.getElementById('groupPassword');

const EmailIconValidation = document.getElementById('EmailIconValidation');

/* obtain the passwords to validate and compare  */
const password = document.getElementById('password')

/* get the labels to modify the type and display the characters with: showHiddenPassword / showHiddenPasswordConfirm  */
const labelShowHiddenPassword = document.getElementById('labelShowHiddenPassword');
const showHiddenPassword = document.getElementById('showHiddenPassword');

/* ALERTS */
const alertEmail = document.getElementById('alertEmail');
const alertPassword = document.getElementById('alertPassword');
const alertError = document.getElementById('alertError');

const expressions = {
    regUserName: /^[a-zA-Z\s]+$/,
    regEmail: /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/,
    regPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.#!?])[a-zA-Z0-9.#!?]{4}$/
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('dataUser')) {
        obtainData = JSON.parse(localStorage.getItem('dataUser'));
    } else{
        console.log('Error database')
    }

    const inputsBooleans = {
        email: false,
        password: false,
    }

    const validatedForm = (e) => {
        switch (e.target.name) {
            case "email":
                if (expressions.regEmail.test(e.target.value.trim())) {
                    groupEmail.classList.remove('error');
                    alertEmail.classList.remove('error');
                    inputsBooleans.email = true;
                } else {
                    groupEmail.classList.add('error');
                    EmailIconValidation.classList.add('bi-exclamation-circle-fill');
                    alertEmail.classList.add('error');
                    inputsBooleans.email = false;
                }
                break;

            case "password":
                if (!password.value.trim()) {
                    groupPassword.classList.add('error');
                    alertPassword.classList.add('error');
                    inputsBooleans.password = false;
                }
                else {
                    groupPassword.classList.remove('error');
                    alertPassword.classList.remove('error');
                    inputsBooleans.password = true;
                }
                break;
            default:
                break;
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('blur', validatedForm)
    })

    labelShowHiddenPassword.addEventListener('click', () => {
        showHiddenPassword.classList.toggle("bi-eye-slash-fill");
        const type = password.getAttribute("type") === 'password' ? 'text' : 'password';
        password.setAttribute("type", type);
    })

    const validation = (e) => {
        if (!inputsBooleans.email && !inputsBooleans.password) {
            alertPassword.classList.add('error');
            alertEmail.classList.add('error');
            e.preventDefault()
        }
        if (!inputsBooleans.email) {
            alertEmail.classList.add('error');
            e.preventDefault()
        }
        if (!inputsBooleans.password) {
            alertPassword.classList.add('error');
            e.preventDefault()
        }
        else {
            const finderUser = obtainData.find(user => user.mail === userEmail.value && user.password === password.value);
            if (!finderUser) {
                alertError.classList.add('error');
                setTimeout(() => {
                    alertError.classList.remove('error')
                }, 4000);
                e.preventDefault()
            } else {
                localStorage.setItem('userLogin', JSON.stringify(userEmail.value));
                e.preventDefault();
                setTimeout(() => {
                    window.location.href="./welcome.html";
                }, 1000);
            }
        }
    }

    form.addEventListener('submit', e => {
        validation(e);
    })
})





