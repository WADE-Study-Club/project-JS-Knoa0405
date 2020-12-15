import { postLogin } from './api.mjs';

import { loadItem, clearItem } from './storage.mjs';

const section = document.querySelector('.form-container');

const email = document.getElementById('login-email');

const password = document.getElementById('login-password');

const button = document.querySelector('.login-button');

const inputs = {
  email: "",
  password: ""
};

const user = loadItem("user");

function handleLogOut() {
  clearItem("user");

  window.location.href = "http://127.0.0.1:5500/index.html";
}

function changeLogin() {
  const sectionHtml = `
    <h1 class="title">로그인 성공</h1>
    <button class="logout-button">Log Out</button>
  `;
  section.innerHTML = sectionHtml;

  const button = section.querySelector('.logout-button');

  button.addEventListener('click', handleLogOut);
}


function handleChange(e) {
  const { name, value } = e.target;

  inputs[name] = value;
}

function handleClick(e) {
  e.preventDefault();

  postLogin(inputs);
}

function init() {
  button.addEventListener("click", handleClick);
  email.addEventListener("input", handleChange);
  password.addEventListener("input", handleChange);
  if (user) {
    changeLogin();
  }
}

init();
