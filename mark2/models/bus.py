class Bus:
    def __init__(self, mongo):
        self.mongo = mongo

    def get_current_location(self, route_number):
        # Fetch the current location of the bus for the given route number
        bus_location = self.mongo.db.bus_locations.find_one(
            {'route_number': route_number},
            sort=[('timestamp', -1)]  # Get the most recent location
        )
        if bus_location:
            return {
                'lat': bus_location['latitude'],
                'lng': bus_location['longitude']
            }
        return None

    def get_route(self, route_number):
        # Fetch the route details for the given route number
        route = self.mongo.db.routes.find_one({'route_number': route_number})
        if route and 'coordinates' in route:
            # Assuming coordinates are stored in the route document
            return route['coordinates']
        return []
