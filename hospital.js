import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function loadDashboard(){

// Total Donors
const donorSnapshot = await getDocs(collection(db,"donors"));

document.getElementById("totalDonors").innerText =
donorSnapshot.size;


// Emergency Requests

const requestSnapshot = await getDocs(collection(db,"EmergencyRequests"));

document.getElementById("totalRequests").innerText =
requestSnapshot.size;


const table = document.getElementById("requestTable");

requestSnapshot.forEach((doc)=>{

const data = doc.data();

table.innerHTML += `
<tr>

<td>${data.patientName}</td>

<td>${data.bloodGroup}</td>

<td>${data.hospital}</td>

<td>${data.location}</td>

<td>${data.status}</td>

</tr>
`;

});

// Notifications
const notificationSnapshot = await getDocs(
    query(
        collection(db, "Notifications"),
        orderBy("createdAt", "desc")
    )
);

const notificationList = document.getElementById("notificationList");

notificationSnapshot.forEach((doc) => {

    const data = doc.data();

    notificationList.innerHTML += `
        <li>${data.message}</li>
    `;

});
}

loadDashboard();