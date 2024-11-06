from flask import Blueprint, render_template, request, jsonify, session, redirect, url_for
from models.driver import Driver
from models.bus import Bus
from datetime import datetime
from mongo import mongo

driver_bp = Blueprint('driver', __name__)


@driver_bp.route('/driver/dashboard')
def dashboard():
    if 'user_type' not in session or session['user_type'] != 'driver':
        return redirect(url_for('auth.login', user_type='driver'))

    driver = Driver(mongo)

    absent_students = driver.get_absent_students(
        session['route_number'],
        datetime.now().strftime('%Y-%m-%d')
    )

    return render_template('driver/dashboard.html', absent_students=absent_students)


@driver_bp.route('/api/update-location', methods=['POST'])
def update_location():
    if 'user_type' not in session or session['user_type'] != 'driver':
        return jsonify({'error': 'Unauthorized'}), 401

    location_data = request.json
    bus = Bus(mongo)
    bus.update_location(session['route_number'], location_data)

    return jsonify({'success': True})


@driver_bp.route('/api/bus-location/<route_number>')
def bus_location(route_number):
    bus = Bus(mongo)
    location = bus.get_current_location(route_number)
    route = bus.get_route(route_number)
    return jsonify({'location': location, 'route': route})
