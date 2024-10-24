from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import pandas as pd
import pickle

# Load the dataset
df = pd.read_csv('updated_bus_data_with_traffic_speed.csv')

# Check for missing values
print(df.isnull().sum())

# Split data into features (X) and target (y)
X = df[['distance_to_stop', 'traffic_level', 'bus_speed', 'time_of_day', 'weather', 'history_eta', 'route_length']]
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
