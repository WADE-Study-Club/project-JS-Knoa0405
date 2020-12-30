import { getLogin, postLogin } from './api.mjs';

const signUpButton = document.querySelector('.sign-up-button'),
  email = document.querySelector('#sign-up-email'),
  password = document.querySelector('#sign-up-password'),
  alertText = document.querySelector('p.alert-text');

const inputs = {
  email: "",
  password: ""
}

function InitializeState() {
  email.value = "";

  password.value = "";

  alertText.innerText = "";
}

function AlertMessage({ message }) {

  const alertMessage = document.createTextNode(message);

  alertText.appendChild(alertMessage);
}

function handleInputs(e) {
  const { name, value } = e.target;

  inputs[name] = value;

  AlertMessage({ message: "" });
}

async function handleSignUpCheck(e) {
  e.preventDefault();

  const userData = await getLogin();

  const userEmail = inputs.email;

  const userPassword = inputs.password;

  InitializeState();

  const regexText = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

  if (userEmail && regexText.test(userEmail) === false) {
    AlertMessage({ message: '이메일 형식이 올바르지 않습니다.' });
    return;
  }

  if (userEmail && regexText.test(userEmail) === true && userData.some(({ email }) => email === userEmail)) {
    AlertMessage({ message: '이미 가입된 이메일입니다.' });
    return;
  }

  if (userPassword && userPassword.length < 8) {
    AlertMessage({ message: '비밀번호는 최소 8자리 이상 입력해야 합니다.' });
    return;
  }
  if (userEmail && regexText.test(userEmail) && userPassword.length >= 8) {
    await postLogin({ email: userEmail, password: userPassword });
  }
}

function init() {
  email.addEventListener('input', handleInputs);

  password.addEventListener('input', handleInputs);

  signUpButton.addEventListener('click', handleSignUpCheck);
}

init();
