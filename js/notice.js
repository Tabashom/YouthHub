import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  collection, addDoc, getDocs, deleteDoc, doc, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const noticeInput = document.getElementById("noticeInput");
const postNoticeBtn = document.getElementById("postNoticeBtn");
const noticeList = document.getElementById("noticeList");

let userId = null;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    userId = user.uid;
    loadNotices();
  } else {
    window.location.href = "login.html";
  }
});

async function loadNotices() {
  noticeList.innerHTML = "";
  const q = query(collection(db, "notices"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const li = document.createElement("li");
    li.textContent = data.text;
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.onclick = () => deleteNotice(docSnap.id);
    li.appendChild(delBtn);
    noticeList.appendChild(li);
  });
}

postNoticeBtn.addEventListener("click", async () => {
  const noticeText = noticeInput.value.trim();
  if (!noticeText) return;
  await addDoc(collection(db, "notices"), {
    text: noticeText,
    userId: userId,
    timestamp: new Date()
  });
  noticeInput.value = "";
  loadNotices();
});

async function deleteNotice(id) {
  await deleteDoc(doc(db, "notices", id));
  loadNotices();
}
