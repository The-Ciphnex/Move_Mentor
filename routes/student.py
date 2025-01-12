from models.bus import Bus
from flask import Blueprint, render_template, request, jsonify, session, redirect, url_for
from models.student import Student
from datetime import datetime
from bson.objectid import ObjectId  # Add this import
from mongo import mongo
from models.driver import Driver
student_bp = Blueprint('student', __name__)


@student_bp.route('/student/dashboard')
def dashboard():
    if 'user_type' not in session or session['user_type'] != 'student':
        return redirect(url_for('auth.login', user_type='student'))
    student = Student(mongo, session['user_id'])  # Pass the student ID
    bus_location = student.get_bus_location(session['route_number'])
    return render_template('student/dashboard.html', bus_location=bus_location)


@student_bp.route('/api/mark-attendance', methods=['POST'])
def mark_attendance():
    if 'user_type' not in session or session['user_type'] != 'student':
        return jsonify({'error': 'Unauthorized'}), 401
    data = request.json
    student = Student(mongo, session['user_id'])
    student.mark_attendance(session['user_id'], data['date'], data['status'])

    # Notify the driver
    driver = Driver(mongo)
    driver.notify_absent_student(
        session['route_number'], session['user_id'], data['status'])

    return jsonify({'success': True})


@student_bp.route('/api/student-bus-location/<route_number>')
def student_bus_location(route_number):
    # Fetch the bus location for the student based on the route number
    bus = Bus(mongo)
    location = bus.get_current_location(route_number)  # Implement this method
    return jsonify({'location': location})
