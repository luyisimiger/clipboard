
import os
# basedir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

# Flask Server Sent Events (SSE)
SSE_REDIS_URL = os.environ.get("SSE_REDIS_URL")

# SQLAlchemy
SQLALCHEMY_DATABASE_URI = os.environ.get("SQLALCHEMY_DATABASE_URI")
SQLALCHEMY_TRACK_MODIFICATIONS = True
