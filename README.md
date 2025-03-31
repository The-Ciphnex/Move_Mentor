# Move Mentor: College Bus Transportation System

A comprehensive bus transportation management system designed for colleges to efficiently track buses, manage routes, and provide real-time location updates to students and drivers.

## Features

### College Admin Features

- Dashboard with overview of buses, drivers, and students
- Bus management (add, edit, delete buses)
- Route management with interactive maps
- Unique code generation for driver authentication
- Track active drivers and routes

### Driver Features

- Real-time location sharing
- View absent student notifications
- Interactive map display
- Route visualization

### Student Features

- Real-time bus location tracking
- Attendance marking (present/absent)
- Route information

## Technology Stack

- **Backend**: [Python Flask](https://flask.palletsprojects.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Flask-PyMongo](https://flask-pymongo.readthedocs.io/)
- **Frontend**: HTML, CSS, JavaScript
- **Maps & Location**: [Google Maps API](https://developers.google.com/maps)

## Installation and Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/move-mentor.git
cd move-mentor
```

2. Install dependencies

```bash
pip install -r requirements.txt
```

3. Configure the database

   - Install and start MongoDB
   - Update MongoDB connection string in `config.py` if needed

4. Set up Google Maps API

   - Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Add the API key to `config.py` or set as environment variable:

   ```bash
   export GOOGLE_MAPS_API_KEY="your-api-key"
   ```

5. Run the application

```bash
python app.py
```

6. Access the application at `http://localhost:5000`

## Project Structure

```
move_mentor/
├── app.py              # Main application entry point
├── config.py           # Configuration settings
├── mongo.py            # MongoDB connection setup
├── models/             # Data models
│   ├── bus.py          # Bus model
│   ├── college.py      # College model
│   ├── driver.py       # Driver model
│   └── student.py      # Student model
├── routes/             # Route controllers
│   ├── auth.py         # Authentication routes
│   ├── college.py      # College admin routes
│   ├── driver.py       # Driver routes
│   └── student.py      # Student routes
├── static/             # Static assets
│   ├── css/            # Stylesheets
│   └── js/             # JavaScript files
├── templates/          # HTML templates
│   ├── base.html       # Base template
│   ├── index.html      # Landing page
│   ├── login.html      # Login page
│   └── ...             # Other templates
└── utils/              # Utility functions
    ├── location.py     # Location calculations
    └── route_optimizer.py # Route optimization
```

## Usage

### College Admin

1. Register a new college account
2. Add buses and create routes
3. Generate unique access codes for drivers
4. Monitor active buses and students

### Driver

1. Log in using the unique code provided by the college
2. Enable location sharing
3. View route and absent student notifications

### Student

1. Register with your college email
2. Track your bus location in real-time
3. Mark attendance (absent/present)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
