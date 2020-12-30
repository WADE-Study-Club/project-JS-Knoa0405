export function saveItem({ key, value }) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadItem(key) {
  return localStorage.getItem(key);
}

export function clearItem(key) {
  return localStorage.removeItem(key);
}
