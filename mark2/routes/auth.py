from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from mongo import mongo  # Import the mongo object
import re

auth_bp = Blueprint('auth', __name__)

def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

def is_strong_password(password):
    if len(password) < 8:
        return False
    if not re.search(r"[A-Z]", password):
        return False
    if not re.search(r"[a-z]", password):
        return False
    if not re.search(r"\d", password):
        return False
    return True

@auth_bp.route('/register/<user_type>', methods=['GET', 'POST'])
def register(user_type):
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        # Basic validation
        if not is_valid_email(email):
            flash('Please enter a valid email address.', 'error')
            return render_template('register.html', user_type=user_type)

        if not is_strong_password(password):
            flash('Password must be at least 8 characters long and contain uppercase, lowercase, and numbers.', 'error')
            return render_template('register.html', user_type=user_type)

        if password != confirm_password:
            flash('Passwords do not match.', 'error')
            return render_template('register.html', user_type=user_type)

        if user_type == 'college':
            # Check if college already exists
            existing_college = mongo.db.colleges.find_one({'email': email})
            if existing_college:
                flash('Email already registered.', 'error')
                return render_template('register.html', user_type=user_type)

            college_data = {
                'name': request.form['college_name'].strip(),
                'email': email.lower(),
                'password': generate_password_hash(password),
                'routes': []
            }
            try:
                mongo.db.colleges.insert_one(college_data)
                flash('Registration successful! Please login.', 'success')
            except Exception as e:
                flash('An error occurred during registration.', 'error')
                return render_template('register.html', user_type=user_type)

        elif user_type == 'student':
            # Check if student already exists
            existing_student = mongo.db.students.find_one({'email': email})
            if existing_student:
                flash('Email already registered.', 'error')
                return render_template('register.html', user_type=user_type)

            # Validate route number
            route = mongo.db.buses.find_one({'route_number': request.form['route_number']})
            if not route:
                flash('Invalid route number.', 'error')
                return render_template('register.html', user_type=user_type)

            student_data = {
                'name': request.form['name'].strip(),
                'email': email.lower(),
                'password': generate_password_hash(password),
                'route_number': request.form['route_number'],
                'stop_name': request.form['stop_name'].strip()
            }
            try:
                mongo.db.students.insert_one(student_data)
                flash('Registration successful! Please login.', 'success')
            except Exception as e:
                flash('An error occurred during registration.', 'error')
                return render_template('register.html', user_type=user_type)

        return redirect(url_for('auth.login', user_type=user_type))
    return render_template('register.html', user_type=user_type)

@auth_bp.route('/login/<user_type>', methods=['GET', 'POST'])
def login(user_type):
    if request.method == 'POST':
        if user_type == 'college':
            email = request.form['email'].lower()
            password = request.form['password']

            college = mongo.db.colleges.find_one({'email': email})
            if college and check_password_hash(college['password'], password):
                session['user_id'] = str(college['_id'])
                session['user_type'] = 'college'
                session['email'] = email
                flash('Login successful!', 'success')
                return redirect(url_for('college.dashboard'))
            else:
                flash('Invalid email or password.', 'error')

        elif user_type == 'driver':
            unique_code = request.form['unique_code'].strip()
            driver = mongo.db.buses.find_one({'unique_code': unique_code})
            
            if driver:
                session['user_id'] = str(driver['_id'])
                session['user_type'] = 'driver'
                session['route_number'] = driver['route_number']
                flash('Login successful!', 'success')
                return redirect(url_for('driver.dashboard'))
            else:
                flash('Invalid unique code.', 'error')

        elif user_type == 'student':
            email = request.form['email'].lower()
            password = request.form['password']

            student = mongo.db.students.find_one({'email': email})
            if student and check_password_hash(student['password'], password):
                session['user_id'] = str(student['_id'])
                session['user_type'] = 'student'
                session['route_number'] = student['route_number']
                session['email'] = email
                flash('Login successful!', 'success')
                return redirect(url_for('student.dashboard'))
            else:
                flash('Invalid email or password.', 'error')

    return render_template('login.html', user_type=user_type)

@auth_bp.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out.', 'info')
    return redirect(url_for('auth.login', user_type='college'))
