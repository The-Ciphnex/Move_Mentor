import datetime


class Student:
    def __init__(self, mongo):
        self.mongo = mongo

    def mark_attendance(self, student_id, date, status):
        student = self.mongo.db.students.find_one({'_id': student_id})
        return self.mongo.db.attendance.update_one(
            {
                'student_id': student_id,
                'route_number': student['route_number'],
                'date': date
            },
            {
                '$set': {
                    'status': status,
                    'updated_at': datetime.now()
                }
            },
            upsert=True
        )

    def get_bus_location(self, route_number):
        return self.mongo.db.bus_locations.find_one(
            {'route_number': route_number},
            sort=[('timestamp', -1)]
        )