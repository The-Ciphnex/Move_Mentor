from flask import Blueprint, render_template, request, session, redirect, url_for, jsonify
from models.college import College
from bson.objectid import ObjectId
from mongo import mongo

college_bp = Blueprint('college', __name__)


@college_bp.route('/college/dashboard', methods=['GET'])
def dashboard():
    if 'user_id' not in session or session['user_type'] != 'college':
        return redirect(url_for('auth.login', user_type='college'))

    college_id = session['user_id']
    college = College(mongo, college_id)

    routes = college.get_routes()
    active_drivers = college.get_active_drivers()
    total_students = college.get_total_students()
    total_buses = mongo.db.buses.count_documents(
        {'college_id': college_id})  # Count buses for the specific college

    return render_template('college/dashboard.html', college=college.college,
                           routes=routes, active_drivers=active_drivers,
                           total_students=total_students, total_buses=total_buses)


@college_bp.route('/college/manage_buses', methods=['GET'])
def manage_buses():
    if 'user_id' not in session or session['user_type'] != 'college':
        return redirect(url_for('auth.login', user_type='college'))

    # Filter buses by college
    buses = mongo.db.buses.find({'college_id': session['user_id']})
    return render_template('college/manage_buses.html', buses=buses)


@college_bp.route('/college/add_bus', methods=['POST'])
def add_bus():
    if 'user_id' not in session or session['user_type'] != 'college':
        return jsonify({'error': 'Unauthorized'}), 401

    bus_data = {
        'bus_number': request.form['bus_number'],
        'route_number': request.form['route_number'],
        'driver_name': request.form['driver_name'],
        'capacity': request.form['capacity'],
        'status': request.form['status'],
        'last_maintenance': request.form['last_maintenance'],
        'college_id': session['user_id']  # Associate bus with the college
    }
    mongo.db.buses.insert_one(bus_data)
    return redirect(url_for('college.manage_buses'))


@college_bp.route('/college/add_route', methods=['POST'])
def add_route():
    if 'user_id' not in session or session['user_type'] != 'college':
        return jsonify({'error': 'Unauthorized'}), 401

    bus_number = request.form['bus_number']
    # Check if the bus exists in the database for the specific college
    bus_exists = mongo.db.buses.find_one(
        {'bus_number': bus_number, 'college_id': session['user_id']})

    if not bus_exists:
        # Return an error if the bus does not exist
        return jsonify({'error': 'Bus does not exist for this college'}), 400

    route_data = {
        'route_number': request.form['route_number'],
        'bus_number': bus_number,
        'stops': request.form.getlist('stops[]'),
        'status': 'active',  # Default status
        'college_id': session['user_id']  # Associate route with the college
    }
    mongo.db.routes.insert_one(route_data)
    return redirect(url_for('college.dashboard'))


@college_bp.route('/college/bus_details/<bus_id>', methods=['GET'])
def bus_details(bus_id):
    bus = mongo.db.buses.find_one({'_id': ObjectId(bus_id)})
    return jsonify(bus)


@college_bp.route('/college/edit_bus/<bus_id>', methods=['POST'])
def edit_bus(bus_id):
    if 'user_id' not in session or session['user_type'] != 'college':
        return jsonify({'error': 'Unauthorized'}), 401

    bus_data = {
        'bus_number': request.form['bus_number'],
        'route_number': request.form['route_number'],
        'driver_name': request.form['driver_name'],
        'capacity': request.form['capacity'],
        'status': request.form['status'],
        'last_maintenance': request.form['last_maintenance']
    }
    mongo.db.buses.update_one({'_id': ObjectId(bus_id)}, {'$set': bus_data})
    return redirect(url_for('college.manage_buses'))


@college_bp.route('/college/delete_bus/<bus_id>', methods=['DELETE'])
def delete_bus(bus_id):
    if 'user_id' not in session or session['user_type'] != 'college':
        return jsonify({'error': 'Unauthorized'}), 401

    # First get the bus details to know its bus_number
    bus = mongo.db.buses.find_one({'_id': ObjectId(bus_id)})
    if bus:
        # Delete all routes associated with this bus number
        mongo.db.routes.delete_many({'bus_number': bus['bus_number']})
        # Then delete the bus
        mongo.db.buses.delete_one({'_id': ObjectId(bus_id)})
        return jsonify({'success': 'Bus and associated routes deleted successfully'})
    return jsonify({'error': 'Bus not found'}), 404


@college_bp.route('/college/delete_route/<route_id>', methods=['DELETE'])
def delete_route(route_id):
    if 'user_id' not in session or session['user_type'] != 'college':
        return jsonify({'error': 'Unauthorized'}), 401

    mongo.db.routes.delete_one({'_id': ObjectId(route_id)})
    return jsonify({'success': 'Route deleted successfully'})
