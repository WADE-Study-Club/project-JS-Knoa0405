import { getLogin } from './api.mjs';

import { saveItem, clearItem } from './storage.mjs';

const main = document.querySelector('.form-container');

const email = document.getElementById('login-email');

const password = document.getElementById('login-password');

const button = document.querySelector('.login-button');

const alertText = document.querySelector('.alert-text');

const inputs = {
  email: "",
  password: ""
};

// 자동 로그인 구현?

function handleLogOut() {
  clearItem("user");

  window.location.href = "http://127.0.0.1:5500/index.html";
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

function changeLogin({ user }) {
  console.log(user);

  if (user) {
    const email = user.email;

    const nickname = email.slice(0, email.indexOf('@'));

    const mainHtml = `
      <div class="logout-container">
        <span class="logout-nickname">${nickname} 님 안녕하세요 !</span>
        <h1 class="title">로그인 성공</h1>
        <button class="logout-button">Log Out</button>
      </div>
    `;

    main.innerHTML = mainHtml;

    const button = main.querySelector('.logout-button');

    button.addEventListener('click', handleLogOut);

    saveItem({ key: 'userToken', value: user.id });

    InitializeState();
  }
}

async function checkUserData() {
  const userData = await getLogin();

  const regexText = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

  console.log(userData);

  if (inputs.email && regexText.test(inputs.email) && userData.some(({ email }) => email === inputs.email)) {
    InitializeState();

    if (!userData.some(({ password }) => password === inputs.password)) {

      AlertMessage({ message: "비밀번호가 틀렸습니다." });
    }
  }

  if (inputs.email && regexText.test(inputs.email) && !userData.some(({ email }) => email === inputs.email)) {
    InitializeState();

    AlertMessage({ message: "해당 입력된 이메일은 등록된 이메일이 아닙니다." });
  }

  if (userData.some(({ email }) => email === inputs.email) && userData.some(({ password }) => password === inputs.password)) {
    const validUser = await userData.filter(({ email, password }) => email === inputs.email && password === inputs.password);

    return validUser[0];
  }
}

function handleChange(e) {
  const { name, value } = e.target;

  inputs[name] = value;
}

async function handleClick(e) {
  e.preventDefault();

  if (inputs.email && inputs.password) {
    const user = await checkUserData();
    changeLogin({ user });
  }
}

function init() {
  button.addEventListener("click", handleClick);

  email.addEventListener("input", handleChange);

  password.addEventListener("input", handleChange);
}

init();
