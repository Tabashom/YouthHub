// js/resources.js
import { auth, db, storage } from './firebase.js';
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  collection, addDoc, getDocs, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// DOM Elements
const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("resourceFile");
const subjectInput = document.getElementById("subject");
const resourceList = document.getElementById("resourceList");

// ✅ Redirect if not logged in
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    loadResources();
  }
});

// ✅ Upload PDF
uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  const subject = subjectInput.value.trim();

  if (!file || !subject) {
    alert("Please fill in all fields.");
    return;
  }

  // ✅ Allow only PDFs
  if (file.type !== "application/pdf") {
    alert("Only PDF files are allowed.");
    return;
  }

  try {
    const filePath = `resources/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, filePath);

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
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Upload failed. Please try again.");
  }
});

// ✅ Load and Display All PDFs
async function loadResources() {
  resourceList.innerHTML = "";

  const resourceQuery = query(collection(db, "resources"), orderBy("uploadedAt", "desc"));
  const querySnapshot = await getDocs(resourceQuery);

  querySnapshot.forEach((doc) => {
    const { fileName, subject, url, uploadedAt } = doc.data();

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${subject}</strong> - 
      <a href="${url}" target="_blank">${fileName}</a>
    `;
    resourceList.appendChild(li);
  });
}
