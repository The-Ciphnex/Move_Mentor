def optimize_route(stops, absent_students):
    """
    Optimize the bus route based on present students
    
    Args:
        stops (list): List of all bus stops
        absent_students (list): List of students who marked themselves as absent
    
    Returns:
        list: Optimized list of stops
    """
    # Remove stops where all students are absent
    optimized_stops = []
    for stop in stops:
        students_at_stop = [s for s in stop['students'] if s['id'] not in absent_students]
        if students_at_stop:
            optimized_stops.append(stop)
    
    return optimized_stops