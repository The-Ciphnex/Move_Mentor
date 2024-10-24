import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import pickle

# Step 1: Data Preparation and Feature Engineering

# Assuming data is already loaded into a DataFrame or created
np.random.seed(42)

# Create dummy data for demonstration purposes
n_samples = 1000
distance_to_stop = np.random.uniform(0.5, 5.0, n_samples)  # Distance to stop in kilometers
traffic_level = np.random.choice([1, 2, 3], n_samples)  # 1: light, 2: moderate, 3: heavy traffic
time_of_day = np.random.uniform(0, 24, n_samples)  # Time of day in 24-hour format
weather = np.random.choice([0, 1], n_samples)  # 0: clear, 1: rainy
history_eta = np.random.uniform(10, 60, n_samples)  # Historical ETA for the stop

# Adding bus speed (km/h), average speed between stops
bus_speed = np.random.uniform(20, 60, n_samples)  # Average speed between 20 and 60 km/h

# Calculate the arrival time (this is simulated as target data)
arrival_time = distance_to_stop * 10 / bus_speed  # Base calculation with speed factor

# Add effects of traffic levels
arrival_time += traffic_level * 5  # Higher traffic levels increase arrival time

# Add effects of morning and evening peaks using np.where for safety
arrival_time += np.where((time_of_day > 7) & (time_of_day < 9), np.random.uniform(5, 10, n_samples), 0)  # Morning peak
arrival_time += np.where((time_of_day > 17) & (time_of_day < 19), np.random.uniform(5, 10, n_samples), 0)  # Evening peak

# Add effect of weather conditions (rain adds delay)
arrival_time += np.where(weather == 1, np.random.uniform(5, 15, n_samples), 0)

# Step 2: Create a DataFrame
df = pd.DataFrame({
    'distance_to_stop': distance_to_stop,
    'traffic_level': traffic_level,
    'time_of_day': time_of_day,
    'weather': weather,
    'history_eta': history_eta,
    'bus_speed': bus_speed,  # New speed feature
    'arrival_time': arrival_time
})

# Step 3: Splitting the Dataset
X = df[['distance_to_stop', 'traffic_level', 'time_of_day', 'weather', 'history_eta', 'bus_speed']]
y = df['arrival_time']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 4: Train the Model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 5: Evaluate the Model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error on test set: {mse}")

# Save the model
with open('bus_arrival_model_with_speed.pkl', 'wb') as file:
    pickle.dump(model, file)
print("Model saved as 'bus_arrival_model_with_speed.pkl'.")

# Step 6: Test the Model with a Sample Input
sample_input = np.array([[2.5, 2, 8.5, 0, 25, 45]])  # Example input with speed
predicted_arrival_time = model.predict(sample_input)
print(f"Predicted arrival time: {predicted_arrival_time[0]}")
