from bson.objectid import ObjectId  # Add this import


class Student:
    def __init__(self, mongo, student_id=None):
        self.mongo = mongo
        if student_id:
            self.student = self.mongo.db.students.find_one(
                {'_id': ObjectId(student_id)})
        else:
            self.student = None

    def get_bus_location(self, route_number):
        route = self.mongo.db.routes.find_one({'route_number': route_number})
        if route and 'bus_id' in route:
            return self.mongo.db.buses.find_one({'_id': route['bus_id']})
        return None

    def mark_attendance(self, student_id, date, status):
        attendance_record = {
            'student_id': student_id,
            'date': date,
            'status': status,
            'route_number': self.student['route_number']
        }
        self.mongo.db.attendance.insert_one(attendance_record)
