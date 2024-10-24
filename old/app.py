from flask import Flask, request, jsonify
import requests
import googlemaps
import pandas as pd
import pickle
import numpy as np

# Initialize Flask app
app = Flask(__name__)

# Load the pre-trained model
with open('bus_arrival_model_with_traffic_speed.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Initialize Google Maps client with your API Key
GOOGLE_API_KEY = 'AIzaSyDahELVeBPwPin_s_tn-7Vwda7gri8IYKU'  # Replace with your actual Google API Key
gmaps = googlemaps.Client(key=GOOGLE_API_KEY)

# Route for predicting ETA
@app.route('/predict_eta', methods=['POST'])
def predict_eta():
    try:
        # Get data from the request
        data = request.json
        current_location = data['current_location']  # latitude, longitude of the bus
        destination = data['destination']  # latitude, longitude of the stop
        traffic_level = data['traffic_level']  # from frontend or predefined (1, 2, 3)
        time_of_day = data['time_of_day']  # provided by frontend (hour of day)
        weather = data['weather']  # 1 = clear, 2 = rainy (user input or derived)
        history_eta = data['history_eta']  # past average ETA

        # Call Google Distance Matrix API to get real-time distance and duration
        distance_matrix = gmaps.distance_matrix(current_location, destination, mode='driving', traffic_model='best_guess', departure_time='now')
        distance_to_stop = distance_matrix['rows'][0]['elements'][0]['distance']['value'] / 1000  # distance in kilometers
        bus_speed = distance_matrix['rows'][0]['elements'][0]['duration_in_traffic']['value'] / 60  # time in minutes

        # Construct the input for the ML model
        input_data = pd.DataFrame([{
            'distance_to_stop': distance_to_stop,
            'traffic_level': traffic_level,
            'bus_speed': bus_speed,
            'time_of_day': time_of_day,
            'weather': weather,
            'history_eta': history_eta,
            'route_length': distance_to_stop * 1.1  # assuming route is slightly longer than straight-line distance
        }])

        # Use the trained ML model to predict ETA
        predicted_eta = model.predict(input_data)[0]

        # Return the predicted ETA to the frontend
        return jsonify({'predicted_eta': predicted_eta})

    except Exception as e:
        return jsonify({'error': str(e)})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
