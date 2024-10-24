from flask import Flask, render_template
from flask_pymongo import PyMongo
import os
from routes.auth import auth_bp
from routes.college import college_bp
from routes.driver import driver_bp
from routes.student import student_bp
from mongo import mongo

app = Flask(__name__)
app.secret_key = os.urandom(24)
app.config["MONGO_URI"] = "mongodb://localhost:27017/bus_management"
mongo.init_app(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(college_bp)
app.register_blueprint(driver_bp)
app.register_blueprint(student_bp)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
