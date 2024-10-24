from flask import Blueprint, render_template, request, jsonify, session
from models.driver import Driver
from datetime import datetime

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
    driver = Driver(mongo)
    driver.update_location(session['user_id'], location_data)
    return jsonify({'success': True})