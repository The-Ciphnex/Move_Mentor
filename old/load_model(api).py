from flask import Flask, request, jsonify
import googlemaps
import pickle
import numpy as np

app = Flask(__name__)

# Load the updated model
with open('bus_arrival_model_with_traffic_speed.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Initialize Google Maps client with your API key
gmaps = googlemaps.Client(key='AIzaSyDahELVeBPwPin_s_tn-7Vwda7gri8IYKU')

# Function to get distance, duration, and traffic information from Google Maps API
def get_distance_matrix(origin_coords, destination_coords):
    result = gmaps.distance_matrix(origins=origin_coords, destinations=destination_coords, mode='driving')
    if result['status'] == 'OK':
        distance = result['rows'][0]['elements'][0]['distance']['value'] / 1000  # in km
        duration = result['rows'][0]['elements'][0]['duration']['value'] / 60  # in minutes
        return distance, duration
    return None, None

# List of predefined bus stops (latitude, longitude)
bus_stops = [(12.9716, 77.5946), (12.9351, 77.6245), (12.9304, 77.6784)]  # Example coordinates

# API endpoint to predict ETA
@app.route('/api/predict_eta', methods=['POST'])
def predict_eta():
    data = request.get_json()
    bus_location = (data['latitude'], data['longitude'])

    predictions = []
    for stop in bus_stops:
        distance, history_eta = get_distance_matrix(bus_location, stop)
        if distance is None:
            return jsonify({'error': 'Could not fetch data from Google Maps API'}), 400

        # Simulate traffic level, bus speed, and route length
        traffic_level = 2  # You can modify this to fetch from Google Maps API or other sources
        bus_speed = 40  # You could calculate this using real-time data
        route_length = distance * 1.1  # Assume route length slightly larger than straight-line distance
        time_of_day = 9  # assume it's 9 AM
        weather = 1  # clear weather

        # Prepare input for the ML model
        input_data = np.array([[distance, traffic_level, bus_speed, time_of_day, weather, history_eta, route_length]])

        # Predict ETA
        predicted_eta = model.predict(input_data)[0]
        predictions.append(predicted_eta)

    return jsonify({'predicted_eta': predictions})

if __name__ == '__main__':
    app.run(debug=True)
