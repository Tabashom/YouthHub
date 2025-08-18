import { auth } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById('user-info').textContent = `Logged in as: ${user.email}`;
  } else {
    window.location.href = "login.html"; 
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  }).catch(err => alert("Logout error: " + err.message));
});
