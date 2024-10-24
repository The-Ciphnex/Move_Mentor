class Driver:
    def __init__(self, mongo):
        self.mongo = mongo

    def update_location(self, driver_id, location_data):
        return self.mongo.db.bus_locations.insert_one({
            'driver_id': driver_id,
            'route_number': location_data['route_number'],
            'latitude': location_data['latitude'],
            'longitude': location_data['longitude'],
            'timestamp': location_data['timestamp']
        })

    def get_absent_students(self, route_number, date):
        return list(self.mongo.db.attendance.find({
            'route_number': route_number,
            'date': date,
            'status': 'absent'
        }))

    def update_profile(self, driver_id, profile_data):
        return self.mongo.db.drivers.update_one(
            {'_id': driver_id},
            {'$set': profile_data}
        )