// aiPrediction.js

import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function predictBloodAvailability(bloodGroup) {
    const snapshot = await getDocs(collection(db, "donors"));

    let count = 0;

    snapshot.forEach((doc) => {
        const donor = doc.data();

        if (donor.bloodGroup === bloodGroup) {
            count++;
        }
    });

    let prediction = "";

    if (count >= 10) {
        prediction = "🟢 High Availability";
    } else if (count >= 5) {
        prediction = "🟡 Medium Availability";
    } else {
        prediction = "🔴 Low Availability";
    }

    document.getElementById("prediction").innerHTML =
        `AI Prediction: <b>${prediction}</b><br>Total Donors: ${count}`;
}

globalThis.predictBloodAvailability = predictBloodAvailability;