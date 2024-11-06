from bson.objectid import ObjectId


class College:
    def __init__(self, mongo, college_id):
        self.mongo = mongo
        self.college_id = college_id
        self.college = self.mongo.db.colleges.find_one(
            {'_id': ObjectId(college_id)})

    def get_routes(self):
        return list(self.mongo.db.routes.find({'college_id': self.college_id}))

    def get_active_drivers(self):
        return self.mongo.db.drivers.count_documents({'college_id': self.college_id, 'status': 'active'})

    def get_total_students(self):
        return self.mongo.db.students.count_documents({'college_id': self.college_id})
