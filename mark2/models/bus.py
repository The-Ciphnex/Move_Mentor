from datetime import datetime
from bson import ObjectId


class Bus:
    def __init__(self, mongo):
        self.mongo = mongo
        # Hardcoded Mysore routes
        self.routes = {
            "MYS001": {
                "name": "Mysore Palace - Infosys",
                "coordinates": [
                    {"lat": 12.3052, "lng": 76.6553},  # Mysore Palace
                    {"lat": 12.3096, "lng": 76.6497},  # K.R. Circle
                    {"lat": 12.3147, "lng": 76.6428},  # Railway Station
                    {"lat": 12.3235, "lng": 76.6394},  # Gokulam
                    {"lat": 12.3419, "lng": 76.6393},  # Hebbal
                    {"lat": 12.3721, "lng": 76.6354}   # Infosys Mysore
                ],
                "stops": [
                    {
                        "name": "Mysore Palace Bus Stop",
                        "lat": 12.3052,
                        "lng": 76.6553,
                        "eta_minutes": 0
                    },
                    {
                        "name": "K.R. Circle",
                        "lat": 12.3096,
                        "lng": 76.6497,
                        "eta_minutes": 10
                    },
                    {
                        "name": "Railway Station",
                        "lat": 12.3147,
                        "lng": 76.6428,
                        "eta_minutes": 20
                    },
                    {
                        "name": "Gokulam Main Road",
                        "lat": 12.3235,
                        "lng": 76.6394,
                        "eta_minutes": 30
                    },
                    {
                        "name": "Hebbal",
                        "lat": 12.3419,
                        "lng": 76.6393,
                        "eta_minutes": 40
                    },
                    {
                        "name": "Infosys Mysore",
                        "lat": 12.3721,
                        "lng": 76.6354,
                        "eta_minutes": 50
                    }
                ]
            },
            "MYS002": {
                "name": "University Route",
                "coordinates": [
                    {"lat": 12.3052, "lng": 76.6553},  # Mysore Palace
                    {"lat": 12.2958, "lng": 76.6394},  # Chamundi Hills Road
                    {"lat": 12.2920, "lng": 76.6357},  # JSS College
                    {"lat": 12.3137, "lng": 76.6194},  # University of Mysore
                    {"lat": 12.3146, "lng": 76.6143}   # Manasagangotri
                ],
                "stops": [
                    {
                        "name": "Mysore Palace",
                        "lat": 12.3052,
                        "lng": 76.6553,
                        "eta_minutes": 0
                    },
                    {
                        "name": "Chamundi Hills Road",
                        "lat": 12.2958,
                        "lng": 76.6394,
                        "eta_minutes": 15
                    },
                    {
                        "name": "JSS College",
                        "lat": 12.2920,
                        "lng": 76.6357,
                        "eta_minutes": 25
                    },
                    {
                        "name": "University of Mysore",
                        "lat": 12.3137,
                        "lng": 76.6194,
                        "eta_minutes": 35
                    },
                    {
                        "name": "Manasagangotri",
                        "lat": 12.3146,
                        "lng": 76.6143,
                        "eta_minutes": 45
                    }
                ]
            }
        }

    def get_current_location(self, route_number):
        # In production, this would come from the database
        # For demo, return the first coordinate of the route
        if route_number in self.routes:
            first_stop = self.routes[route_number]["coordinates"][0]
            return {
                'lat': first_stop["lat"],
                'lng': first_stop["lng"],
                'timestamp': datetime.utcnow(),
                'speed': 30  # Average speed in km/h
            }
        return None

    def get_route(self, route_number):
        if route_number in self.routes:
            return {
                'coordinates': self.routes[route_number]["coordinates"],
                'stops': self.routes[route_number]["stops"]
            }
        return {'coordinates': [], 'stops': []}

    def update_location(self, route_number, location_data):
        # In production, this would update the database
        # For demo, just print the update
        print(f"Updated location for route {route_number}: {location_data}")
        return True
