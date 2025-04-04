from flask import Blueprint, render_template, request, jsonify, session, redirect, url_for
from models.driver import Driver
from datetime import datetime
from mongo import mongo
from models.bus import Bus
driver_bp = Blueprint('driver', __name__)


@driver_bp.route('/driver/dashboard')
def dashboard():
    # Check if the user is logged in as a driver
    if 'user_type' not in session or session['user_type'] != 'driver':
        return redirect(url_for('auth.login', user_type='driver'))

    driver = Driver(mongo)

    # Fetch absent students for the current route and date
    absent_students = driver.get_absent_students(
        session['route_number'],
        datetime.now().strftime('%Y-%m-%d')
    )

    # Remove the profile fetching line
    # profile = driver.get_profile(session['user_id'])  # This line should be removed

    return render_template('driver/dashboard.html', absent_students=absent_students)


@driver_bp.route('/api/update-location', methods=['POST'])
def update_location():
    try:
        # Check if the user is logged in as a driver
        if 'user_type' not in session or session['user_type'] != 'driver':
            return jsonify({'error': 'Unauthorized'}), 401

        # Get and validate the location data
        location_data = request.json
        required_fields = ['lat', 'lng', 'accuracy', 'timestamp']
        if not location_data or not all(field in location_data for field in required_fields):
            return jsonify({'error': 'Missing required location data'}), 400
            
        # Validate coordinate ranges
        if not (-90 <= float(location_data['lat']) <= 90) or \
           not (-180 <= float(location_data['lng']) <= 180):
            return jsonify({'error': 'Invalid coordinate values'}), 400
            
        # Validate accuracy
        if float(location_data['accuracy']) > 100:  # More than 100 meters is too inaccurate
            return jsonify({'error': 'Location accuracy too low'}), 400

        # Add route_number to location data
        location_data['route_number'] = session.get('route_number')
        
        # Create a Driver instance to update the location
        driver = Driver(mongo)
        driver.update_location(session['user_id'], location_data)

        return jsonify({'success': True, 'message': 'Location updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@driver_bp.route('/api/bus-location/<route_number>')
def bus_location(route_number):
    # Fetch the bus location and route based on the route number
    bus = Bus(mongo)
    location = bus.get_current_location(route_number)  # Implement this method
    route = bus.get_route(route_number)  # Implement this method
    return jsonify({'location': location, 'route': route})