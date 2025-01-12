import os

class Config:
    SECRET_KEY = os.urandom(24)
    MONGO_URI = "mongodb://localhost:27017/BUS_TRANSPORTATION"
    UPLOAD_FOLDER = "static/uploads"
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    GOOGLE_MAPS_API_KEY = os.environ.get('GOOGLE_MAPS_API_KEY')