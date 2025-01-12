from bson.objectid import ObjectId


class College:
    def __init__(self, mongo, college_id):
        self.mongo = mongo
        self.college_id = college_id
        self.college = self.mongo.db.colleges.find_one(
            {'_id': ObjectId(college_id)})

    def get_routes(self):
        routes = list(self.mongo.db.routes.find({'college_id': self.college_id}))
        # Format stops data for display
        for route in routes:
            if 'stops' in route:
                formatted_stops = []
                for stop in route['stops']:
                    if isinstance(stop, dict):
                        formatted_stops.append(stop['address'])
                    else:
                        formatted_stops.append(stop)
                route['formatted_stops'] = formatted_stops
        return routes

    def get_active_drivers(self):
        # Query buses with active drivers for this college
        return self.mongo.db.buses.count_documents({
            'college_id': self.college_id,
            'driver_name': {'$exists': True, '$ne': ''},  # Check for non-empty driver name
            'status': 'active'
        })

    def get_total_students(self):
        # Get all active routes for this college
        college_routes = [route['route_number'] for route in self.mongo.db.routes.find({
            'college_id': self.college_id,
            'status': 'active'
        })]
        
        # Count students assigned to these routes and are active
        return self.mongo.db.students.count_documents({
            'route_number': {'$in': college_routes},
            'status': 'active'  # Only count active students
        })