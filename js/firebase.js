// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeQh7_LDjlIzaj9gHM4YEhSnR0swUO7AU",
  authDomain: "youthhub-543e9.firebaseapp.com",
  projectId: "youthhub-543e9",
  storageBucket: "youthhub-543e9.appspot.com",
  messagingSenderId: "60933851932",
  appId: "1:60933851932:web:f5736e19beae029a1808d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
