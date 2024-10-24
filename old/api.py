from flask import Flask, request, jsonify
import herepy
import pickle
import numpy as np

app = Flask(__name__)

# Load the updated model
with open('bus_arrival_model_with_traffic_speed.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Initialize Here Maps client with your API key
here_api_key = 'pW3ZjxKC5ppRTBZFhSEr-o_yDI7LMIkL1e5utettWa8'
gmaps = herepy.RoutingApi(api_key=here_api_key)

# Function to get distance, duration, and traffic information from Here Maps API
def get_distance_matrix(origin_coords, destination_coords):
    response = gmaps.pedastrian_route(
        waypoint_a=herepy.RouteWaypoint(lat=origin_coords[0], lng=origin_coords[1]),
        waypoint_b=herepy.RouteWaypoint(lat=destination_coords[0], lng=destination_coords[1])
    )
    if response.is_error:
        return None, None
    route = response.response['routes'][0]['sections'][0]
    distance = route['summary']['length'] / 1000  # in km
    duration = route['summary']['duration'] / 60  # in minutes
    return distance, duration

# List of predefined bus stops (latitude, longitude)
bus_stops = [(12.9716, 77.5946), (12.9351, 77.6245), (12.9304, 77.6784)]  # Example coordinates

# API endpoint to predict ETA
@app.route('/api/predict_eta', methods=['POST'])
def predict_eta():
    data = request.get_json()
    bus_location = (data['latitude'], data['longitude'])
    predictions = []
    for stop in bus_stops:
        distance, duration = get_distance_matrix(bus_location, stop)
        if distance is None:
            return jsonify({'error': 'Could not fetch data from Here Maps API'}), 400
        # Simulate traffic level, bus speed, and route length
        traffic_level = 2  # You can modify this to fetch from Here Maps API or other sources
        bus_speed = 40  # You could calculate this using real-time data
        route_length = distance * 1.1  # Assume route length slightly larger than straight-line distance
        time_of_day = 9  # assume it's 9 AM
        weather = 1  # clear weather
        # Prepare input for the ML model
        input_data = np.array([[distance, traffic_level, bus_speed, time_of_day, weather, duration, route_length]])
        # Predict ETA
        predicted_eta = model.predict(input_data)[0]
        predictions.append(predicted_eta)
    return jsonify({'predicted_eta': predictions})

if __name__ == '__main__':
    app.run(debug=True)
