import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function sendNotification(bloodGroup, hospital, location) {

    await addDoc(collection(db, "Notifications"), {

        title: "🚨 Emergency Blood Request",

        message: `Urgent ${bloodGroup} blood required at ${hospital}, ${location}`,

        bloodGroup: bloodGroup,

        hospital: hospital,

        location: location,

        status: "Unread",

        createdAt: serverTimestamp()

    });

}