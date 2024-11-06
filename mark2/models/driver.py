from datetime import datetime
from bson import ObjectId


class Driver:
    def __init__(self, mongo):
        self.mongo = mongo

    def notify_absent_student(self, route_number, student_id, status):
        # Logic to notify the driver about the absent student
        if status == 'absent':
            self.remove_student_from_route(route_number, student_id)

    def remove_student_from_route(self, route_number, student_id):
        # Remove the student from the route stops
        self.mongo.db.routes.update_one(
            {'route_number': route_number},
            {'$pull': {'stops': {'student_id': student_id}}}
        )

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

    def get_notifications(self, route_number):
        return list(self.mongo.db.notifications.find({
            'route_number': route_number,
            'date': datetime.now().strftime('%Y-%m-%d')
        }))
