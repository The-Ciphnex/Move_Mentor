function showAddBusModal() {
    var modal = document.getElementById('addBusModal');
    modal.style.display = 'block';
}

function closeAddBusModal() {
    var modal = document.getElementById('addBusModal');
    modal.style.display = 'none';
}

function submitAddBusForm() {
    var form = document.getElementById('addBusForm');
    var formData = new FormData(form);

    fetch('/college/add_bus', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Bus added successfully!');
            window.location.href = '/college/manage_buses';
        } else {
            alert('Failed to add bus.');
        }
    });
}

function editBus(busId) {
    fetch(`/college/bus_details/${busId}`)
    .then(response => response.json())
    .then(bus => {
        document.getElementById('editBusId').value = busId;
        document.getElementById('editBusNumber').value = bus.bus_number;
        document.getElementById('editRouteNumber').value = bus.route_number;
        document.getElementById('editDriverName').value = bus.driver_name;
        document.getElementById('editCapacity').value = bus.capacity;
        document.getElementById('editStatus').value = bus.status;
        document.getElementById('editLastMaintenance').value = bus.last_maintenance;

        var modal = document.getElementById('editBusModal');
        modal.style.display = 'block';
    })
    .catch(error => console.error('Error fetching bus details:', error));
}

function deleteBus(busId) {
    if (confirm('Are you sure you want to delete this bus?')) {
        fetch(`/college/delete_bus/${busId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Bus deleted successfully!');
                window.location.href = '/college/manage_buses';
            } else {
                alert('Failed to delete bus.');
            }
        })
        .catch(error => console.error('Error deleting bus:', error));
    }
}

function generateUniqueCode(busId) {
    fetch(`/college/generate_code/${busId}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById(`uniqueCode-${busId}`).textContent = data.unique_code;
            alert('Unique code generated successfully!');
        } else {
            alert('Failed to generate unique code.');
        }
    })
    .catch(error => console.error('Error generating unique code:', error));
}
