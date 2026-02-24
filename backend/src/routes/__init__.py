# Routes module
from .location import location_bp
from .features import features_bp
from .chatbot import chatbot_bp

__all__ = [
    'location_bp',
    'features_bp', 
    'chatbot_bp',
]

