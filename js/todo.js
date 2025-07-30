import { db, auth } from './firebase.js';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Wait for auth to get user
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid;
    const tasksRef = collection(db, 'tasks');

    // Add task
    addTaskBtn.addEventListener('click', async () => {
      const task = taskInput.value.trim();
      if (task === '') return;

      await addDoc(tasksRef, {
        task,
        userId,
        createdAt: Date.now()
      });
      taskInput.value = '';
    });

    // Real-time task display
    const q = query(tasksRef, where("userId", "==", userId));
    onSnapshot(q, (snapshot) => {
      taskList.innerHTML = '';
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const li = document.createElement('li');
        li.textContent = data.task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.addEventListener('click', async () => {
          await deleteDoc(doc(db, 'tasks', docSnap.id));
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    });
  } else {
    // User not logged in
    window.location.href = 'login.html';
  }
});
