import { auth } from "./firebase.js";

const noticeInput = document.getElementById('noticeInput');
const postNoticeBtn = document.getElementById('postNoticeBtn');
const noticeList = document.getElementById('noticeList');

let currentUser = null;

// Listen for Firebase Auth state changes
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = { uid: user.uid };
        loadNotices();
    } else {
        // Not logged in, redirect to login page
        window.location.href = "login.html";
    }
});

// Load all notices
async function loadNotices() {
    if (!currentUser) return;

    try {
        const res = await fetch("php/get_notices.php");
        if (!res.ok) throw new Error("Failed to fetch notices");
        const data = await res.json();

        noticeList.innerHTML = '';

        data.forEach(n => {
            const li = document.createElement('li');
            li.textContent = n.text;

            // Add delete button only for the current user's notices
            if (n.user_id === currentUser.uid) {
                const delBtn = document.createElement('button');
                delBtn.textContent = '🗑';
                delBtn.classList.add('delBtn');
                delBtn.onclick = async () => {
                    try {
                        const delRes = await fetch("php/delete_notice.php", {
                            method: 'POST',
                            body: new URLSearchParams({ 
                                id: n.id, 
                                user_id: currentUser.uid 
                            })
                        });
                        const delData = await delRes.text();
                        if (delRes.ok) {
                            loadNotices(); // Refresh after delete
                        } else {
                            alert("Failed to delete notice: " + delData);
                        }
                    } catch (err) {
                        console.error(err);
                        alert("Error deleting notice: " + err.message);
                    }
                };
                li.appendChild(delBtn);
            }

            noticeList.appendChild(li);
        });

    } catch (err) {
        console.error(err);
        alert("Error loading notices: " + err.message);
    }
}

// Post a new notice
postNoticeBtn.addEventListener('click', async () => {
    if (!currentUser) return;

    const text = noticeInput.value.trim();
    if (!text) return alert("Write something!");

    try {
        const res = await fetch("php/post_notice.php", {
            method: 'POST',
            body: new URLSearchParams({ 
                text, 
                user_id: currentUser.uid 
            })
        });

        const data = await res.text();
        if (res.ok && data === "success") {
            noticeInput.value = '';
            loadNotices(); // Refresh after posting
        } else {
            alert("Failed to post notice: " + data);
        }
    } catch (err) {
        console.error(err);
        alert("Error posting notice: " + err.message);
    }
});
