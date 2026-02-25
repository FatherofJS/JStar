from flask import Blueprint, request, jsonify
from src.models.user import create_user, verify_user, create_tables

auth_bp = Blueprint('auth', __name__)

# Create tables on module load
create_tables()

@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Register a new user
    
    Request body:
        email: user's email
        name: user's name
        password: user's password
    
    Returns user data on success
    """
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    email = data.get('email', '').strip().lower()
    name = data.get('name', '').strip()
    password = data.get('password', '')
    
    # Validation
    if not email or not name or not password:
        return jsonify({'error': 'Email, name, and password are required'}), 400
    
    if len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters'}), 400
    
    # Create user
    result = create_user(email, name, password)
    
    if not result['success']:
        return jsonify({'error': result['error']}), 400
    
    return jsonify({
        'success': True,
        'user': result['user']
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Login user
    
    Request body:
        email: user's email
        password: user's password
    
    Returns user data on success
    """
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    
    # Validation
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400
    
    # Verify user
    result = verify_user(email, password)
    
    if not result['success']:
        return jsonify({'error': result['error']}), 401
    
    return jsonify({
        'success': True,
        'user': result['user']
    })
