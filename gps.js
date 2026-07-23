function getLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(showPosition);

    } else {

        document.getElementById("currentLocation").innerHTML =
        "Geolocation is not supported.";

    }

}

function showPosition(position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.getElementById("currentLocation").innerHTML =

    `Latitude : ${latitude}<br>
     Longitude : ${longitude}`;

}

window.getLocation = getLocation;