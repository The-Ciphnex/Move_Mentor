import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import pickle


class BusArrivalModel:
    def __init__(self):
        self.model = None

    def train_model(self):
        np.random.seed(42)
        n_samples = 1000
        distance_to_stop = np.random.uniform(1, 10, n_samples)
        traffic_level = np.random.choice([1, 2, 3], n_samples)
        time_of_day = np.random.uniform(0, 24, n_samples)
        speed = np.random.uniform(20, 60, n_samples)
        weather = np.random.choice([0, 1], n_samples)
        history_eta = np.random.uniform(5, 60, n_samples)

        arrival_time = distance_to_stop / speed * 60
        arrival_time += (traffic_level == 2) * \
            np.random.uniform(5, 10, n_samples)
        arrival_time += (traffic_level == 3) * \
            np.random.uniform(10, 15, n_samples)
        arrival_time += np.logical_and(time_of_day > 7,
                                       time_of_day < 9) * np.random.uniform(5, 10, n_samples)
        arrival_time += np.logical_and(time_of_day > 17,
                                       time_of_day < 19) * np.random.uniform(5, 10, n_samples)
        arrival_time += (weather == 1) * np.random.uniform(5, 10, n_samples)

        data = pd.DataFrame({
            'distance_to_stop': distance_to_stop,
            'traffic_level': traffic_level,
            'time_of_day': time_of_day,
            'speed': speed,
            'weather': weather,
            'history_eta': history_eta,
            'arrival_time': arrival_time
        })

        X = data[['distance_to_stop', 'traffic_level',
                  'time_of_day', 'speed', 'weather', 'history_eta']]
        y = data['arrival_time']
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42)

        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.model.fit(X_train, y_train)

        with open('bus_arrival_model_with_speed.pkl', 'wb') as file:
            pickle.dump(self.model, file)
        print("Model trained and saved as bus_arrival_model_with_speed.pkl")

    def load_model(self):
        with open('bus_arrival_model_with_speed.pkl', 'rb') as file:
            self.model = pickle.load(file)

    def predict_eta(self, input_data):
        return self.model.predict([input_data])[0]


if __name__ == "__main__":
    model = BusArrivalModel()
    model.train_model()
