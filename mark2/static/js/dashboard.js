function showAddRouteModal() {
    var modal = document.getElementById('addRouteModal');
    modal.style.display = 'block';
}

function closeModal() {
    var modal = document.getElementById('addRouteModal');
    modal.style.display = 'none';
}

function addStop() {
    var stopsList = document.getElementById('stopsList');
    var newStop = document.createElement('div');
    newStop.className = 'stop-entry';
    newStop.innerHTML = `
        <input type="text" name="stops[]" required />
        <button type="button" class="btn btn-sm btn-danger" onclick="removeStop(this)">Remove</button>
    `;
    stopsList.appendChild(newStop);
}

function removeStop(button) {
    var stopEntry = button.parentElement;
    stopEntry.remove();
}

function submitAddRoute(event) {
    event.preventDefault();
    var form = document.getElementById('addRouteForm');
    var formData = new FormData(form);

    fetch('/college/add_route', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Route added successfully!');
            location.reload();
        } else {
            response.json().then(data => alert(data.error));  // Show error message
        }
    });
}

function deleteRoute(routeId) {
    if (confirm('Are you sure you want to delete this route?')) {
        fetch(`/college/delete_route/${routeId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Route deleted successfully!');
                location.reload();
            } else {
                alert('Failed to delete route.');
            }
        });
    }
}