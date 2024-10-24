class Dashboard {
    constructor() {
        this.initializeMap();
        this.setupEventListeners();
        this.locationTracker = null;
    }

    initializeMap() {
        if (document.getElementById('map')) {
            this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: { lat: 0, lng: 0 }
            });
        }
    }

    setupEventListeners() {
        // Profile form submission
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => this.handleProfileUpdate(e));
        }

        // Location tracking toggle
        const locationToggle = document.getElementById('locationToggle');
        if (locationToggle) {
            locationToggle.addEventListener('change', (e) => this.handleLocationToggle(e));
        }

        // Route management
        const addRouteForm = document.getElementById('addRouteForm');
        if (addRouteForm) {
            addRouteForm.addEventListener('submit', (e) => this.handleAddRoute(e));
        }
    }

    async handleProfileUpdate(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const response = await fetch('/api/update-profile', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (data.success) {
                this.showNotification('Profile updated successfully', 'success');
            }
        } catch (error) {
            this.showNotification('Failed to update profile', 'error');
        }
    }

    handleLocationToggle(e) {
        if (e.target.checked) {
            this.startLocationTracking();
        } else {
            this.stopLocationTracking();
        }
    }

    async handleAddRoute(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const response = await fetch('/api/add-route', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (data.success) {
                this.showNotification('Route added successfully', 'success');
                location.reload();
            }
        } catch (error) {
            this.showNotification('Failed to add route', 'error');
        }
    }

    startLocationTracking() {
        if (!this.locationTracker) {
            this.locationTracker = new LocationTracker();
        }
        this.locationTracker.startTracking();
    }

    stopLocationTracking() {
        if (this.locationTracker) {
            this.locationTracker.stopTracking();
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});