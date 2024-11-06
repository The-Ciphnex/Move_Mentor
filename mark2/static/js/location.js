class LocationTracker {
    constructor() {
        this.watchId = null;
    }

    startTracking() {
        if ("geolocation" in navigator) {
            this.watchId = navigator.geolocation.watchPosition(
                position => this.updateLocation(position),
                error => console.error("Error getting location:", error),
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        }
    }

    stopTracking() {
        if (this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    }

    updateLocation(position) {
        const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: new Date().toISOString()
        };

        // Send location update to server
        fetch('/api/update-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(location)
        });
    }
}
