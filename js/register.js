const form = document.getElementById('form');
const inputs = document.querySelectorAll('.formInput');

const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');

const groupEmail = document.getElementById('groupEmail');
const groupPassword = document.getElementById('groupPassword');
const groupPasswordConfirm = document.getElementById('groupPasswordConfirm');

const userNameIconValidation = document.getElementById('userNameIconValidation');
const EmailIconValidation = document.getElementById('EmailIconValidation');
let privacyConditions = document.getElementById('privacyConditions');

/* obtain the passwords to validate and compare  */
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('passwordConfirm');

/* get the labels to modify the type and display the characters with: showHiddenPassword / showHiddenPasswordConfirm  */
const labelShowHiddenPassword = document.getElementById('labelShowHiddenPassword');
const labelShowHiddenPasswordConfirm = document.getElementById('labelShowHiddenPasswordConfirm');

const showHiddenPassword = document.getElementById('showHiddenPassword');
const showHiddenPasswordConfirm = document.getElementById('showHiddenPasswordConfirm');

/* ALERTS */

const alertUserName = document.getElementById('alertUserName');
const alertEmail = document.getElementById('alertEmail');
const alertPassword = document.getElementById('alertPassword');
const alertPasswordConfirm = document.getElementById('alertPasswordConfirm');
const alertSuccess = document.getElementById('alertSuccess');
const alertError = document.getElementById('alertError');

const expressions = {
    regUserName: /^[a-zA-Zñ\s]{3,10}$/,
    regEmail: /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/,
    regPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.#!?])[a-zA-Z0-9.#!?]{4,8}$/
}

document.addEventListener('DOMContentLoaded', () => {
    
    if (localStorage.getItem('dataUser')) {
        dataUser = JSON.parse(localStorage.getItem('dataUser'));
    } else{
        dataUser = [];
    }

    const inputsBooleans = {
        usuario: false,
        email: false,
        password: false,
        passwordConfirm: false,
        privacy: false,
    }

    
    const validatedForm = (e) => {
        switch (e.target.name) {
            case "userName":
                if (expressions.regUserName.test(e.target.value.trim())) {
                    groupUser.classList.add('validated');
                    groupUser.classList.remove('error');
                    userNameIconValidation.classList.remove('bi-exclamation-circle-fill');
                    alertUserName.classList.remove('error');
                    alertUserName.style.display = 'none';
                    inputsBooleans.usuario = true;
                } else {
                    groupUser.classList.add('error');
                    groupUser.classList.remove('validated');
                    userNameIconValidation.classList.add('bi-exclamation-circle-fill');
                    alertUserName.classList.add('error');
                    alertUserName.style.display = 'block';
                    inputsBooleans.usuario = false;
                }
                break;
            case "email":
                if (expressions.regEmail.test(e.target.value.trim())) {
                    groupEmail.classList.add('validated');
                    groupEmail.classList.remove('error');
                    EmailIconValidation.classList.remove('bi-exclamation-circle-fill');
                    alertEmail.classList.remove('error');
                    alertEmail.style.display = 'none';
                    inputsBooleans.email = true;
                } else {
                    groupEmail.classList.add('error');
                    groupEmail.classList.remove('validated');
                    EmailIconValidation.classList.add('bi-exclamation-circle-fill');
                    alertEmail.classList.add('error');
                    alertEmail.style.display = 'block';
                    inputsBooleans.email = false;
                }
                break;
            case "password":
                if (expressions.regPassword.test(e.target.value.trim())) {
                    groupPassword.classList.add('validated');
                    groupPassword.classList.remove('error');
                    alertPassword.classList.remove('error');
                    alertPassword.style.display = 'none';
                    inputsBooleans.password = true;
                }
                else {
                    groupPassword.classList.add('error');
                    groupPassword.classList.remove('validated');
                    alertPassword.classList.add('error');
                    alertPassword.style.display = 'block'
                    inputsBooleans.password = false;
                }
                break;
            case "passwordConfirm":
                if (expressions.regPassword.test(e.target.value.trim()) && password.value.trim() === passwordConfirm.value.trim()) {
                    groupPasswordConfirm.classList.add('validated')
                    groupPasswordConfirm.classList.remove('error')
                    alertPasswordConfirm.classList.remove('error');
                    alertPasswordConfirm.style.display = 'none';
                    inputsBooleans.passwordConfirm = true;
                } else {
                    groupPasswordConfirm.classList.add('error')
                    groupPasswordConfirm.classList.remove('validated')
                    alertPasswordConfirm.classList.add('error');
                    alertPasswordConfirm.style.display = 'block'
                    inputsBooleans.passwordConfirm = false;
                }
                break;

            default:
                break;
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('keyup', validatedForm)
    })

    labelShowHiddenPasswordConfirm.addEventListener('click', () => {
        showHiddenPasswordConfirm.classList.toggle("bi-eye-slash-fill");
        const type = passwordConfirm.getAttribute("type") === 'password' ? 'text' : 'password';
        passwordConfirm.setAttribute("type", type);
    })

    labelShowHiddenPassword.addEventListener('click', () => {
        showHiddenPassword.classList.toggle("bi-eye-slash-fill");
        const type = password.getAttribute("type") === 'password' ? 'text' : 'password';
        password.setAttribute("type", type);
    })

    const addUserInfo = (e) => {
        const userNameValue = userName.value;
        const userEmailValue = userEmail.value;
        const userPasswordValue = password.value;

        let infoUser = {
            id: Math.random(),
            name: userNameValue,
            mail: userEmailValue,
            password: userPasswordValue
        }

        const check_existing_user = dataUser.find(user => user.mail === infoUser.mail);

        if (privacyConditions.checked === true) {
            inputsBooleans.privacy = true
            alertPrivacy.classList.remove('error');
        } else {
            alertPrivacy.classList.add('error');
            inputsBooleans.privacy = false;
        }
        
        if (inputsBooleans.usuario && inputsBooleans.email && inputsBooleans.password && inputsBooleans.passwordConfirm && inputsBooleans.privacy) {
            if (check_existing_user) {
                alert('Error user already exist!');
                e.preventDefault()
            }
            else {
                alertSuccess.classList.add('validated');
                dataUser.push(infoUser);
                localStorage.setItem('dataUser', JSON.stringify(dataUser));
                e.preventDefault()
                setTimeout(() => {
                    document.querySelectorAll('.inputContain').forEach(icon => {
                        icon.classList.remove('validated');
                    })
                    alertSuccess.classList.remove('validated');
                    window.location.href="./login.html"
                }, 4000);
            }

        } else {
            document.querySelectorAll('.inputContain').forEach(icon => {
                icon.classList.add('error');
            })
            alertError.classList.add('error')
            setTimeout(() => {
                alertError.classList.remove('error')
            }, 4000);
            e.preventDefault()
        }
    }

    form.addEventListener('submit', e => {
        addUserInfo(e);
    })
})