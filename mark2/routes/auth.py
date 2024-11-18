from flask import Blueprint, render_template, request, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from mongo import mongo  # Import the mongo object
from datetime import timedelta

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register/<user_type>', methods=['GET', 'POST'])
def register(user_type):
    if request.method == 'POST':
        if user_type == 'college':
            college_data = {
                'name': request.form['college_name'],
                'email': request.form['email'],
                'password': generate_password_hash(request.form['password']),
                'routes': []
            }
            mongo.db.colleges.insert_one(college_data)
        elif user_type == 'student':
            student_data = {
                'name': request.form['name'],
                'email': request.form['email'],
                'password': generate_password_hash(request.form['password']),
                'route_number': request.form['route_number'],
                'stop_name': request.form['stop_name']
            }
            mongo.db.students.insert_one(student_data)
        return redirect(url_for('auth.login', user_type=user_type))
    return render_template('register.html', user_type=user_type)


@auth_bp.route('/login/<user_type>', methods=['GET', 'POST'])
def login(user_type):
    if request.method == 'POST':
        remember_me = 'remember_me' in request.form
        
        if user_type == 'college':
            college = mongo.db.colleges.find_one(
                {'email': request.form['email']})
            if college and check_password_hash(college['password'], request.form['password']):
                session['user_id'] = str(college['_id'])
                session['user_type'] = 'college'
                if remember_me:
                    session.permanent = True
                return redirect(url_for('college.dashboard'))
        elif user_type == 'driver':
            driver = mongo.db.buses.find_one({
                'unique_code': request.form['unique_code']
            })
            if driver:
                session['user_id'] = str(driver['_id'])
                session['user_type'] = 'driver'
                session['route_number'] = driver['route_number']
                return redirect(url_for('driver.dashboard'))
        elif user_type == 'student':
            student = mongo.db.students.find_one(
                {'email': request.form['email']})
            if student and check_password_hash(student['password'], request.form['password']):
                session['user_id'] = str(student['_id'])
                session['user_type'] = 'student'
                session['route_number'] = student['route_number']
                if remember_me:
                    session.permanent = True
                return redirect(url_for('student.dashboard'))
    return render_template('login.html', user_type=user_type)


@auth_bp.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('user_type', None)
    session.pop('route_number', None)
    return redirect(url_for('auth.login', user_type='college'))
