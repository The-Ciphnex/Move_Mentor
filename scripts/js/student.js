let busLocation = { lat: 0, lng: 0 };
let estimatedArrival = '15 minutes';

function openTab(evt, tabName) {
    const tabcontent = document.querySelectorAll(".tabcontent");
    tabcontent.forEach(content => content.classList.add("hidden"));

    document.getElementById(tabName).classList.remove("hidden");
}

function handleBusSelection(busId) {
    if (busId) {
        simulateBusMovement();
        document.getElementById("bus-info").classList.remove("hidden");
    } else {
        document.getElementById("bus-info").classList.add("hidden");
    }
}

function simulateBusMovement() {
    let i = 0;
    const interval = setInterval(() => {
        i++;
        busLocation = { lat: 40 + i * 0.001, lng: -74 - i * 0.001 };
        estimatedArrival = `${15 - i} minutes`;

        document.getElementById("bus-lat").textContent = `Lat: ${busLocation.lat.toFixed(4)}`;
        document.getElementById("bus-lng").textContent = `Lng: ${busLocation.lng.toFixed(4)}`;
        document.getElementById("estimated-arrival").textContent = estimatedArrival;

        if (i >= 15) clearInterval(interval);
    }, 1000);
}

function reportAbsence() {
    const reason = document.getElementById("absence-reason").value;
    const duration = document.getElementById("absence-duration").value;

    if (reason && duration) {
        alert(`Absence reported for ${duration} day(s). Reason: ${reason}`);
    } else {
        alert("Please fill in all the details.");
    }
}

function reportLate() {
    const lateMinutes = document.getElementById("late-minutes").value;

    if (lateMinutes) {
        alert(`You've reported that you'll be ${lateMinutes} minutes late. The driver will be notified.`);
    } else {
        alert("Please enter the number of minutes.");
    }
}
