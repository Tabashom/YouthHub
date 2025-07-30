// js/index.js
import { auth } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Check if user is logged in
onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById('user-info').textContent = `Logged in as: ${user.email}`;
  } else {
    window.location.href = "login.html"; // Redirect to login if not logged in
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  }).catch(err => alert("Logout error: " + err.message));
});
