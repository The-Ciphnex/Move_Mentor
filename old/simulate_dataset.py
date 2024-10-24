import numpy as np
import pandas as pd

# Simulate dataset with traffic, speed, and route length
np.random.seed(42)

num_samples = 1000
distance_to_stop = np.random.uniform(1, 20, num_samples)  # in kilometers
traffic_level = np.random.choice([1, 2, 3], num_samples)  # 1=light, 2=moderate, 3=heavy
bus_speed = np.random.uniform(20, 60, num_samples)  # average speed in km/h
time_of_day = np.random.choice([7, 9, 12, 17, 19, 22], num_samples)  # Time in 24-hour format
weather = np.random.choice([1, 2], num_samples)  # 1=clear, 2=rainy
history_eta = np.random.uniform(5, 30, num_samples)  # previous ETA based on history
route_length = distance_to_stop * 1.1  # Assume route length slightly larger than straight-line distance

# Simulate arrival time based on multiple factors
arrival_time = distance_to_stop / bus_speed * 60  # basic time = distance/speed in minutes
arrival_time += (traffic_level == 2) * np.random.uniform(5, 10)  # moderate traffic delay
arrival_time += (traffic_level == 3) * np.random.uniform(10, 20)  # heavy traffic delay
arrival_time += (weather == 2) * np.random.uniform(5, 10)  # delay due to rain
arrival_time += np.where(np.logical_and(time_of_day > 7, time_of_day < 9), 
                         np.random.uniform(5, 10), 0)  # morning peak
arrival_time += np.where(np.logical_and(time_of_day > 17, time_of_day < 19), 
                         np.random.uniform(5, 10), 0)  # evening peak
arrival_time += history_eta * 0.1  # factor in previous history ETA (small adjustment)

# Create a DataFrame
data = {
    'distance_to_stop': distance_to_stop,
    'traffic_level': traffic_level,
    'bus_speed': bus_speed,
    'time_of_day': time_of_day,
    'weather': weather,
    'history_eta': history_eta,
    'route_length': route_length,
    'arrival_time': arrival_time
}

df = pd.DataFrame(data)
df.to_csv('updated_bus_data_with_traffic_speed.csv', index=False)
print("Dataset with traffic, speed, and route length saved as updated_bus_data_with_traffic_speed.csv")
