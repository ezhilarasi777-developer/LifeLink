import {
     db,
     collection,
     addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc
} from"./firebase.js";
/*let donors= JSON .parse(localStorage.getItem("donors")) || [];*/
function registerDonor(event){
    event.preventDefault();
    let donor={
        name:
document.getElementById("name").value,
        age:
document.getElementById("age").value,
        bloodGroup:
document.getElementById("bloodGroup").value,
        availability:
document.getElementById("availability").value,
        phone:
document.getElementById("phone").value,
        location:
document.getElementById("location").value,
        donationDate:
document.getElementById("donationDate").value,
        address:
document.getElementById("address").value
    };
addDoc(collection(db, "donors"), donor)
.then(() => {
    alert("🎉 Registration Successfully");
    document.querySelector("form").reset();
})
.catch((error) => {
    alert("Error: " + error.message);
});
}
async function searchDonor() {

    let bloodGroup = document.getElementById("searchBloodGroup").value;
    let location = document.getElementById("searchLocation").value.toLowerCase();

    let output = "";

    const querySnapshot = await getDocs(collection(db, "donors"));

    querySnapshot.forEach((doc) => {

        const donor = doc.data();

   const bloodMatch =
    bloodGroup === "" || donor.bloodGroup === bloodGroup;

const locationMatch =
    location === "" || donor.location.toLowerCase() === location;

const available =
    donor.availability === "Available" || donor.availability === undefined;

if (bloodMatch && locationMatch && available) {

            output += `
            <div class="donor-card">
                <h3>${donor.name}</h3>
                <p><strong>Blood Group:</strong> ${donor.bloodGroup}</p>
                <p><strong>Location:</strong> ${donor.location}</p>
                <p><strong>Phone:</strong> ${donor.phone}</p>
            </div>
            `;
        }

    });

    if (output === "") {
        output = "<h3>❌ No Donor Found</h3>";
    }

    document.getElementById("searchResult").innerHTML = output;
}
async function loadDonors() {

    let table = document.getElementById("donorTable");

    if (!table) return;

    table.innerHTML = "";
    let total = 0;

    const querySnapshot = await getDocs(collection(db, "donors"));

    querySnapshot.forEach((document) => {
        total++;

        const donor = document.data();

        table.innerHTML += `
        <tr>
            <td>${donor.name}</td>
            <td>${donor.bloodGroup}</td>
            <td>${donor.location}</td>
            <td>${donor.phone}</td>
            <td>
    <button onclick="toggleAvailability('${document.id}','${donor.availability || "Available"}')">
        ${donor.availability || "🟢 Available"}
    </button>
</td>
            <td>
                <button onclick="editDonor('${document.id}')">✏️ Edit</button>
                <button onclick="deleteDonor('${document.id}')">🗑 Delete</button>
            </td>
        </tr>
        `;

    });
    document.getElementById("totalDonors").textContent = total;
document.getElementById("availableDonors").textContent = total;

}
loadDonors();
async function deleteDonor(id) {

    if (confirm("Are you sure?")) {

        await deleteDoc(doc(db, "donors", id));

        loadDonors();
    }
}
async function editDonor(id) {

    const newPhone = prompt("Enter new phone number:");

    if (!newPhone) return;

    await updateDoc(doc(db, "donors", id), {
        phone: newPhone
    });

    loadDonors();
}
async function toggleAvailability(id, currentStatus) {

    let newStatus =
        currentStatus === "Available"
            ? "Not Available"
            : "Available";

    await updateDoc(doc(db, "donors", id), {
        availability: newStatus
    });

    loadDonors();
}
function adminLogin() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {

        alert("✅ Login Successful!");

        window.location.href = "dashboard.html";

    } else {

        alert("❌ Invalid Username or Password");

    }

}

window.adminLogin = adminLogin;
window.editDonor = editDonor;
window.deleteDonor = deleteDonor;
window.toggleAvailability = toggleAvailability;
document.querySelector("form")?.addEventListener("submit", registerDonor);
document.getElementById("searchBtn")?.addEventListener("click", searchDonor);