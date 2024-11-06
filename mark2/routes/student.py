from flask import Blueprint, render_template, request, jsonify, session, redirect, url_for
from models.student import Student
from models.bus import Bus
from models.eta_predictor import ETAPredictor
from datetime import datetime
from mongo import mongo

student_bp = Blueprint('student', __name__)
eta_predictor = ETAPredictor()


@student_bp.route('/student/dashboard')
def dashboard():
    if 'user_type' not in session or session['user_type'] != 'student':
        return redirect(url_for('auth.login', user_type='student'))

    student = Student(mongo, session['user_id'])
    return render_template('student/dashboard.html')


@student_bp.route('/api/student-bus-location/<route_number>')
def student_bus_location(route_number):
    bus = Bus(mongo)
    location = bus.get_current_location(route_number)
    route_info = bus.get_route(route_number)

    # Get student's stop location
    student = Student(mongo, session['user_id'])
    student_stop = student.get_stop_location(route_number)

    if location and student_stop:
        # Calculate ETA
        eta = eta_predictor.predict_eta(
            location,
            student_stop,
            location.get('speed', 0)
        )
    else:
        eta = None

    return jsonify
