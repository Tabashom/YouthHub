import { auth } from './firebase.js'; // or correct path to your Firebase setup
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const loginNav = document.getElementById('loginNav');
const logoutNav = document.getElementById('logoutNav');
const logoutBtn = document.getElementById('logoutBtn');
const welcomeSection = document.getElementById('welcomeSection');
const guestSection = document.getElementById('guestSection');
const userEmailSpan = document.getElementById('userEmail');

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in:", user.email);
    userEmailSpan.textContent = user.email;

    welcomeSection.style.display = "block";
    guestSection.style.display = "none";
    logoutNav.style.display = "flex";
    loginNav.style.display = "none";
  } else {
    console.log("No user logged in.");
    welcomeSection.style.display = "none";
    guestSection.style.display = "block";
    logoutNav.style.display = "none";
    loginNav.style.display = "flex";
  }
});

logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    alert("Logged out successfully");
  }).catch((error) => {
    alert("Logout error: " + error.message);
  });
});
