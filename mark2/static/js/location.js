class LocationTracker {
    constructor(map) {
        this.watchId = null;
        this.map = map;
        this.currentMarker = null;
        this.lastValidLocation = null;
        this.accuracyCircle = null;
    }

    startTracking() {
        if ("geolocation" in navigator) {
            this.watchId = navigator.geolocation.watchPosition(
                position => this.updateLocation(position),
                error => {
                    console.error("Error getting location:", error);
                    alert("Location error: " + error.message);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 1000,
                    distanceFilter: 5 // Reduced to 5 meters for more frequent updates
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    stopTracking() {
        if (this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    }

    updateLocation(position) {
        console.log("Received position update:", position);
        
        // Validate accuracy - increased threshold for testing
        if (position.coords.accuracy > 500) { // Increased to 500 meters for testing
            console.warn("Location accuracy too low:", position.coords.accuracy);
            return;
        }

        const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            speed: position.coords.speed || 0,
            timestamp: new Date().toISOString()
        };

        // Update marker on map
        const latLng = new google.maps.LatLng(location.lat, location.lng);
        
        // Check if movement is significant (more than 10 meters)
        if (this.lastValidLocation) {
            const distance = google.maps.geometry.spherical.computeDistanceBetween(
                latLng,
                new google.maps.LatLng(
                    this.lastValidLocation.lat,
                    this.lastValidLocation.lng
                )
            );
            if (distance < 10) {
                return;
            }
        }

        this.lastValidLocation = location;

        // Update or create marker
        if (this.currentMarker) {
            this.currentMarker.setPosition(latLng);
        } else {
            this.currentMarker = new google.maps.Marker({
                position: latLng,
                map: this.map,
                title: 'Current Location',
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: "#4285F4",
                    fillOpacity: 1,
                    strokeColor: "#FFFFFF",
                    strokeWeight: 2,
                }
            });
        }

        // Update accuracy circle
        if (this.accuracyCircle) {
            this.accuracyCircle.setMap(null);
        }
        this.accuracyCircle = new google.maps.Circle({
            map: this.map,
            center: latLng,
            radius: position.coords.accuracy,
            fillColor: "#4285F4",
            fillOpacity: 0.15,
            strokeColor: "#4285F4",
            strokeOpacity: 0.3,
            strokeWeight: 1
        });

        // Center map on current location
        this.map.setCenter(latLng);

        // Send location update to server
        fetch('/api/update-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(location)
        })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Location updated successfully:', data);
        })
        .catch(error => {
            console.error('Error updating location:', error);
        });

        // Log current tracking state
        console.log('Current location tracker state:', {
            hasMarker: !!this.currentMarker,
            hasAccuracyCircle: !!this.accuracyCircle,
            lastValidLocation: this.lastValidLocation
        });
    }
}