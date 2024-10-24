function updateDriverInfo() {
    const driverName = document.getElementById("driver-name").value;
    const routeNumber = document.getElementById("route-number").value;
    const locationSharing = document.getElementById("location-sharing").checked;

    alert(`Driver Info Updated: \nName: ${driverName} \nRoute: ${routeNumber} \nLocation Sharing: ${locationSharing ? "Enabled" : "Disabled"}`);
}

// Mock notification data (you can replace this with dynamic notifications from a server)
const notifications = [
    "Bus maintenance scheduled for tomorrow.",
    "Route 3 is closed due to road construction.",
    "Please update your contact details."
];

// Display notifications
const notificationList = document.getElementById("notification-list");
notifications.forEach(notification => {
    const listItem = document.createElement("li");
    listItem.textContent = notification;
    notificationList.appendChild(listItem);
});
