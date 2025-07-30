import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = registerForm.email.value.trim();
  const password = registerForm.password.value.trim();

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Registration successful! Please login now.");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Registration failed: " + error.message);
    });
});
