from flask import Blueprint, render_template, request, redirect, url_for, session
from models.college import College

college_bp = Blueprint('college', __name__)

@college_bp.route('/college/dashboard')
def dashboard():
    if 'user_type' not in session or session['user_type'] != 'college':
        return redirect(url_for('auth.login', user_type='college'))
    
    college = College(mongo)
    routes = college.get_routes(session['user_id'])
    return render_template('college/dashboard.html', routes=routes)

@college_bp.route('/college/add-route', methods=['POST'])
def add_route():
    if 'user_type' not in session or session['user_type'] != 'college':
        return redirect(url_for('auth.login', user_type='college'))
    
    route_data = {
        'route_number': request.form['route_number'],
        'bus_number': request.form['bus_number'],
        'stops': request.form.getlist('stops[]')
    }
    
    college = College(mongo)
    unique_id = college.add_bus_route(session['user_id'], route_data)
    
    return jsonify({'success': True, 'driver_unique_id': unique_id})