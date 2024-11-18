from flask import Flask, request, render_template, jsonify, session, redirect, url_for
from flask_pymongo import PyMongo
import os
from routes.auth import auth_bp
from routes.college import college_bp
from routes.driver import driver_bp
from routes.student import student_bp
from mongo import mongo
from bson import ObjectId
import random
import string
from datetime import timedelta

app = Flask(__name__)
app.secret_key = os.urandom(24)
app.config["MONGO_URI"] = "mongodb://localhost:27017/bus_management"
app.permanent_session_lifetime = timedelta(days=30)  # Set session lifetime to 30 days
mongo.init_app(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(college_bp)
app.register_blueprint(driver_bp)
app.register_blueprint(student_bp)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/college/bus_details/<bus_id>')
def bus_details(bus_id):
    bus = mongo.db.buses.find_one({"_id": ObjectId(bus_id)})
    if bus:
        last_maintenance = bus.get('last_maintenance')
        if last_maintenance and hasattr(last_maintenance, 'strftime'):
            last_maintenance = last_maintenance.strftime('%Y-%m-%d')
        return jsonify({
            'bus_number': bus.get('bus_number'),
            'route_number': bus.get('route_number'),
            'driver_name': bus.get('driver_name', 'Not Assigned'),
            'capacity': bus.get('capacity'),
            'status': bus.get('status'),
            'last_maintenance': last_maintenance if last_maintenance else 'Not Available'
        })
    else:
        return jsonify({'error': 'Bus not found'}), 404


@app.route('/college/edit_bus/<bus_id>', methods=['POST'])
def edit_bus(bus_id):
    data = request.form.to_dict()
    mongo.db.buses.update_one({'_id': ObjectId(bus_id)}, {'$set': data})
    return jsonify({'success': 'Bus updated'}), 200


@app.route('/college/delete_bus/<bus_id>', methods=['DELETE'])
def delete_bus(bus_id):
    result = mongo.db.buses.delete_one({'_id': ObjectId(bus_id)})
    if result.deleted_count:
        return jsonify({'success': 'Bus deleted'}), 200
    else:
        return jsonify({'error': 'Bus not found'}), 404

# Driver login endpoint


@app.route('/driver/login', methods=['POST'])
def driver_login():
    route_number = request.form.get('route_number')
    unique_id = request.form.get('unique_id')

    # Find bus by unique code and route number
    bus = mongo.db.buses.find_one(
        {'route_number': route_number, 'unique_code': unique_id})

    if bus:
        # Store driver info in session
        session['user_type'] = 'driver'
        # Storing bus ID or driver's info as required
        session['user_id'] = str(bus['_id'])
        session['route_number'] = bus['route_number']
        # Storing driver name for later use
        session['driver_name'] = bus['driver_name']
        return redirect(url_for('driver.dashboard'))
    else:
        return render_template('login.html', user_type='driver', error='Invalid credentials')

# Generate Unique Code Endpoint


@app.route('/college/generate_code/<bus_id>', methods=['POST'])
def generate_code(bus_id):
    unique_code = ''.join(random.choices(
        string.ascii_uppercase + string.digits, k=8))
    mongo.db.buses.update_one({'_id': ObjectId(bus_id)}, {
                              '$set': {'unique_code': unique_code}})
    return jsonify({'success': True, 'unique_code': unique_code}), 200


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port='8000')
