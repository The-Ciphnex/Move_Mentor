function initializeAutocomplete() {
    // Initialize autocomplete for all stop inputs
    document.querySelectorAll('.stop-input').forEach(input => {
        const autocomplete = new google.maps.places.Autocomplete(input, {
            types: ['geocode'],
            componentRestrictions: { country: 'IN' }  // Restrict to India
        });

        // When a place is selected
        autocomplete.addListener('place_changed', function() {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("No details available for this place");
                return;
            }

            // Get the closest hidden lat/lng inputs
            const latInput = input.parentElement.querySelector('.stop-lat');
            const lngInput = input.parentElement.querySelector('.stop-lng');

            // Update the hidden inputs with the selected location's coordinates
            latInput.value = place.geometry.location.lat();
            lngInput.value = place.geometry.location.lng();
        });
    });
}

// Function to add a new stop input with autocomplete
function addStop() {
    const stopsList = document.getElementById('stopsList');
    const newStop = document.createElement('div');
    newStop.className = 'stop-entry';
    newStop.innerHTML = `
        <input type="text" class="stop-input" name="stops[]" required placeholder="Search for a location"/>
        <input type="hidden" class="stop-lat" name="stop_lats[]">
        <input type="hidden" class="stop-lng" name="stop_lngs[]">
        <button type="button" class="btn btn-sm btn-danger" onclick="removeStop(this)">Remove</button>
    `;
    stopsList.appendChild(newStop);
    
    // Initialize autocomplete for the new input
    initializeAutocomplete();
}

// Function to remove a stop
function removeStop(button) {
    button.parentElement.remove();
}

// Initialize autocomplete when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeAutocomplete();
});
