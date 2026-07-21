import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
 import { sendNotification } from "./notification.js";


const form = document.getElementById("bloodRequestForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const patientName = document.getElementById("patientName").value;
    const bloodGroup = document.getElementById("bloodGroup").value;
    const hospital = document.getElementById("hospital").value;
    const location = document.getElementById("location").value;

    try {

        await addDoc(collection(db, "EmergencyRequests"), {
           
            patientName,
            bloodGroup,
            hospital,
            location,
            status: "Pending",
            createdAt: serverTimestamp()

        });
        await sendNotification(bloodGroup,hospital,location);

        alert("Emergency Blood Request Sent Successfully!");

        form.reset();

    } catch (error) {

        alert(error.message);

    }

});