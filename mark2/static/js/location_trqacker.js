class LocationTracker {
    constructor(routeNumber) {
        this.watchId = null;
        this.routeNumber = routeNumber;
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
            speed: position.coords.speed || 0,
            timestamp: new Date().toISOString()
        };

        fetch('/api/update-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...location,
                route_number: this.routeNumber
            })
        });
    }
}