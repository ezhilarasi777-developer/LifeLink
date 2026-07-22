import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const notificationList = document.getElementById("notificationList");

const snapshot = await getDocs(collection(db, "Notifications"));

snapshot.forEach((doc) => {
    const data = doc.data();

    notificationList.innerHTML += `
        <li>${data.message}</li>
    `;
});