import pickle
import numpy as np
from datetime import datetime
from math import radians, sin, cos, sqrt, atan2


class ETAPredictor:
    def __init__(self):
        try:
            with open('bus_arrival_model.pkl', 'rb') as file:
                self.model = pickle.load(file)
        except FileNotFoundError:
            self.model = None

    def calculate_distance(self, lat1, lon1, lat2, lon2):
        R = 6371  # Earth's radius in kilometers

        lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
        dlat = lat2 - lat1
        dlon = lon2 - lon1

        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
        c = 2 * atan2(sqrt(a), sqrt(1-a))
        distance = R * c

        return distance

    def predict_eta(self, current_location, destination, current_speed, traffic_level=2):
        if not self.model:
            # Fallback calculation if model isn't available
            distance = self.calculate_distance(
                current_location['lat'],
                current_location['lng'],
                destination['lat'],
                destination['lng']
            )

            # Basic ETA calculation (distance/speed) with traffic factor
            traffic_factor = {1: 1.0, 2: 1.3, 3: 1.6}[traffic_level]
            return (distance / (max(current_speed, 5) / 3600)) * traffic_factor

        # If model is available, use ML prediction
        distance = self.calculate_distance(
            current_location['lat'],
            current_location['lng'],
            destination['lat'],
            destination['lng']
        )

        current_hour = datetime.now().hour
        weather = 0  # Assuming clear weather, integrate with weather API if needed

        input_data = np.array([[
            distance,
            traffic_level,
            current_hour,
            current_speed,
            weather,
            distance * 3  # historical average ETA
        ]])

        return self.model.predict(input_data)[0]
