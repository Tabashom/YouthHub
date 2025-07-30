import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const registerLink = document.getElementById("registerLink");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "index.html"; // redirect after login
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});

registerLink.addEventListener("click", (e) => {
  e.preventDefault();
  const email = prompt("Enter email for registration:");
  const password = prompt("Enter password:");

  if (!email || !password) {
    alert("Both email and password are required!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Registration successful! Please login now."))
    .catch((error) => alert("Registration failed: " + error.message));
});
