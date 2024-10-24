from flask import Flask, request, jsonify
import numpy as np
import pickle
import googlemaps
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)

# Load the trained model (bus arrival model with speed feature)
model_path = 'bus_arrival_model_with_speed.pkl'
with open(model_path, 'rb') as file:
    model = pickle.load(file)

# Set your Google Maps API key
GOOGLE_MAPS_API_KEY = 'AIzaSyDahELVeBPwPin_s_tn-7Vwda7gri8IYKU'
gmaps = googlemaps.Client(key=GOOGLE_MAPS_API_KEY)

# Route for predicting the bus ETA based on live data
@app.route('/predict_eta', methods=['POST'])
def predict_eta():
    try:
        # Get the input data from the request (JSON format expected)
        data = request.json
        
        # Extracting inputs from the JSON body
        origin = data['origin']  # Driver's current location
        destination = data['destination']  # Next stop location
        traffic_level = data['traffic_level']  # 1: Light, 2: Moderate, 3: Heavy
        time_of_day = data['time_of_day']  # Time of day in 24-hour format (e.g., 14.5 for 2:30 PM)
        weather = data['weather']  # 0: Clear, 1: Rainy
        history_eta = data['history_eta']  # Historical ETA
        
        # Step 1: Use Google Maps API to get distance and speed between origin and destination
        directions_result = gmaps.directions(origin, destination, mode="driving", departure_time=datetime.now())
        
        # Extracting distance and estimated duration from Google Maps API result
        distance_to_stop = directions_result[0]['legs'][0]['distance']['value'] / 1000  # Convert meters to kilometers
        bus_speed = directions_result[0]['legs'][0]['duration_in_traffic']['value']  # Duration in traffic (seconds)
        bus_speed = (distance_to_stop / (bus_speed / 3600))  # Convert duration to km/h

        # Step 2: Prepare the input array for the model
        input_data = np.array([[distance_to_stop, traffic_level, time_of_day, weather, history_eta, bus_speed]])
        
        # Step 3: Predict the ETA using the model
        predicted_eta = model.predict(input_data)
        
        # Return the predicted ETA as a JSON response
        return jsonify({'predicted_eta': predicted_eta[0]})
    
    except Exception as e:
        return jsonify({'error': str(e)})

# Running the app
if __name__ == '__main__':
    app.run(debug=True)
