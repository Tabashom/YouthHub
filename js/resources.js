// js/resources.js
import { auth, db, storage } from './firebase.js';
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  collection, addDoc, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("resourceFile");
const subjectInput = document.getElementById("subject");
const resourceList = document.getElementById("resourceList");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    loadResources();
  }
});

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  const subject = subjectInput.value.trim();

  if (!file || !subject) return alert("Please fill in all fields.");

  const storageRef = ref(storage, `resources/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);

  const fileURL = await getDownloadURL(storageRef);

  await addDoc(collection(db, "resources"), {
    fileName: file.name,
    subject,
    url: fileURL,
    uploadedAt: new Date(),
  });

  alert("Uploaded successfully!");
  uploadForm.reset();
  loadResources();
});

async function loadResources() {
  resourceList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "resources"));
  querySnapshot.forEach((doc) => {
    const { fileName, subject, url } = doc.data();

    const li = document.createElement("li");
    li.innerHTML = `<strong>${subject}</strong> - <a href="${url}" target="_blank">${fileName}</a>`;
    resourceList.appendChild(li);
  });
}
