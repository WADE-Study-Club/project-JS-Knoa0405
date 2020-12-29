const signUpButton = document.querySelector('.sign-up-button'),
  email = document.querySelector('#sign-up-email'),
  password = document.querySelector('#sign-up-password');

const inputs = {
  email: "",
  password: ""
}

function handleInputCheck(e) {
  const { name, value } = e.target;
  inputs[name] = value;
}

function handleSignUpCheck() {
  const userEmail = inputs.email;
  const userPassword = inputs.password;
  userEmail.some()
  window.location.href = "http://127.0.0.1:5500/index.html";
}


email.addEventListener('input', handleInputCheck);

password.addEventListener('input', handleInputCheck);

signUpButton.addEventListener('click', handleSignUpCheck);