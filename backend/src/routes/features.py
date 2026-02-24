# Features Route - Landing page features endpoint
from flask import Blueprint, request, jsonify
from ..data import get_features

features_bp = Blueprint('features', __name__)


@features_bp.route('/api/features', methods=['GET'])
def get_features_endpoint():
    """
    Get features for landing page.
    
    Query params:
        lang: language code (en, vi, ja) - default: en
    
    Returns:
        JSON response with features list
    """
    language = request.args.get('lang', 'en')
    features = get_features(language)
    return jsonify({'features': features})

