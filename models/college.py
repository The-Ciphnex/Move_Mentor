class College:
    def __init__(self, mongo):
        self.mongo = mongo

    def add_bus_route(self, college_id, route_data):
        route_id = self.mongo.db.routes.insert_one({
            'college_id': college_id,
            'route_number': route_data['route_number'],
            'bus_number': route_data['bus_number'],
            'stops': route_data['stops'],
            'driver_id': None
        }).inserted_id
        unique_id = f"DRV-{route_id}"
        
        self.mongo.db.routes.update_one(
            {'_id': route_id},
            {'$set': {'driver_unique_id': unique_id}}
        )
        
        return unique_id

    def get_routes(self, college_id):
        return list(self.mongo.db.routes.find({'college_id': college_id}))