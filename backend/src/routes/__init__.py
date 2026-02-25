# Routes module
from .location import location_bp
from .features import features_bp
from .chatbot import chatbot_bp
from .auth import auth_bp

__all__ = [
    'location_bp',
    'features_bp', 
    'chatbot_bp',
    'auth_bp',
]
