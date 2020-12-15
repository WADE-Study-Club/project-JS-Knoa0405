import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { saveItem } from "./storage.mjs";

export async function postLogin({ email, password }) {
  const userId = uuidv4();

  const response = await fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: userId,
      email,
      password
    })
  });

  saveItem({ key: "user", value: userId });

  await response.json();
}

export async function getLogin() {
  const response = await fetch("http://localhost:3001/login");

  const data = await response.json();

  return data;
}