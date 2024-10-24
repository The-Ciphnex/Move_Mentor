from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import pandas as pd
import pickle

# Load the dataset
df = pd.read_csv('updated_bus_data_with_traffic_speed.csv')

# Check for missing values
print(df.isnull().sum())

# Define feature columns
features = ['distance_to_stop', 'traffic_level', 'bus_speed', 'time_of_day', 'weather', 'history_eta', 'route_length']

# Split data into features (X) and target (y)
X = df[features]
y = df['arrival_time']

# Split the data into training and test sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the RandomForestRegressor model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error on test set: {mse}")

# Save the model
with open('bus_arrival_model_with_traffic_speed.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)
print("Model saved as bus_arrival_model_with_traffic_speed.pkl")

# Test the model with a sample input (real-time data)
sample_input = {
    'distance_to_stop': 10,  # in kilometers
    'traffic_level': 2,      # moderate traffic
    'bus_speed': 35,         # bus speed in km/h
    'time_of_day': 9,        # 9 AM
    'weather': 1,            # clear weather
    'history_eta': 15,       # based on history
    'route_length': 11       # route slightly longer than distance
}

# Convert the sample input into a DataFrame
input_df = pd.DataFrame([sample_input])

# Predict the ETA for this sample
predicted_eta = model.predict(input_df)[0]
print(f"Predicted ETA for the sample input: {predicted_eta:.2f} minutes")
