import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeQh7_LDjlIzaj9gHM4YEhSnR0swUO7AU",
  authDomain: "youthhub-543e9.firebaseapp.com",
  projectId: "youthhub-543e9",
  storageBucket: "youthhub-543e9.firebasestorage.app",
  messagingSenderId: "60933851932",
  appId: "1:60933851932:web:f5736e19beae029a1808d9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const userEmailSpan = document.getElementById('userEmail');
const logoutBtn = document.getElementById('logoutBtn');
const loginNav = document.getElementById('loginNav');
const logoutNav = document.getElementById('logoutNav');
const welcomeSection = document.getElementById('welcomeSection');
const guestSection = document.getElementById('guestSection');

onAuthStateChanged(auth, (user) => {
  console.log('Auth state changed:', user);
  if (user) {
    userEmailSpan.textContent = user.email;

    welcomeSection.style.display = "block";
    guestSection.style.display = "none";
    logoutNav.style.display = "flex";
    loginNav.style.display = "none";
  } else {
    welcomeSection.style.display = "none";
    guestSection.style.display = "block";
    logoutNav.style.display = "none";
    loginNav.style.display = "flex";
  }
});

logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully");
      // UI updates via onAuthStateChanged
    })
    .catch((error) => alert("Logout error: " + error.message));
});
