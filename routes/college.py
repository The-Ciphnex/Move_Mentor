from flask import Blueprint, render_template, session, redirect, url_for
from models.college import College  # Import College class
from mongo import mongo  # Import the mongo object

college_bp = Blueprint('college', __name__)


@college_bp.route('/college/dashboard')
def dashboard():
    if 'user_id' not in session or session['user_type'] != 'college':
        return redirect(url_for('auth.login', user_type='college'))

    college_id = session['user_id']
    college = College(mongo, college_id)
    routes = college.get_routes()
    active_drivers = college.get_active_drivers()
    total_students = college.get_total_students()

    return render_template('college/dashboard.html', college=college.college, routes=routes, active_drivers=active_drivers, total_students=total_students)


@college_bp.route('/college/manage_buses')
def manage_buses():
    if 'user_id' not in session or session['user_type'] != 'college':
        return redirect(url_for('auth.login', user_type='college'))

    # Add your logic for managing buses here
    return render_template('college/manage_buses.html')
