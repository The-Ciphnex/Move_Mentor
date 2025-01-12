function showAddRouteModal() {
    var modal = document.getElementById('addRouteModal');
    modal.style.display = 'block';
}

function showEditRouteModal(routeId) {
    fetch(`/college/route_details/${routeId}`)
        .then(response => response.json())
        .then(route => {
            var modal = document.getElementById('editRouteModal');
            document.getElementById('editRouteId').value = route.id;
            document.getElementById('editRouteNumber').value = route.route_number;
            document.getElementById('editBusNumber').value = route.bus_number;
            document.getElementById('editRouteStatus').value = route.status;
            
            // Clear existing stops
            var stopsList = document.getElementById('editStopsList');
            stopsList.innerHTML = '';
            
            // Add existing stops
            route.stops.forEach(stop => {
                var stopDiv = document.createElement('div');
                stopDiv.className = 'stop-entry';
                stopDiv.innerHTML = `
                    <input type="text" name="stops[]" value="${stop}" required />
                    <button type="button" class="btn btn-sm btn-danger" onclick="removeStop(this)">Remove</button>
                `;
                stopsList.appendChild(stopDiv);
            });
            
            modal.style.display = 'block';
        });
}

function closeModal() {
    document.getElementById('addRouteModal').style.display = 'none';
    document.getElementById('editRouteModal').style.display = 'none';
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

function addEditStop() {
    var stopsList = document.getElementById('editStopsList');
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
            response.json().then(data => alert(data.error));
        }
    });
}

function submitEditRoute(event) {
    event.preventDefault();
    var form = document.getElementById('editRouteForm');
    var formData = new FormData(form);
    var routeId = document.getElementById('editRouteId').value;

    fetch(`/college/edit_route/${routeId}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Route updated successfully!');
            location.reload();
        } else {
            alert(data.error);
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
