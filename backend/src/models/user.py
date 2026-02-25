"""
User Model - Database operations for users
"""
from src.database import db
import bcrypt

def create_tables():
    """Create users table if not exists"""
    query = """
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    db.execute(query)
    print("✅ Users table created/verified!")

def create_user(email: str, name: str, password: str) -> dict:
    """Create a new user"""
    # Check if email already exists
    existing = db.fetch_one("SELECT id FROM users WHERE email = %s", (email.lower(),))
    if existing:
        return {"success": False, "error": "Email already registered"}
    
    # Hash password
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    # Insert user
    result = db.execute(
        "INSERT INTO users (email, name, password_hash) VALUES (%s, %s, %s) RETURNING id, email, name, created_at",
        (email.lower(), name, password_hash)
    )
    user = db.fetch_one(
        "SELECT id, email, name, created_at FROM users WHERE email = %s",
        (email.lower(),)
    )
    
    return {"success": True, "user": dict(user)}

def verify_user(email: str, password: str) -> dict:
    """Verify user credentials"""
    user = db.fetch_one(
        "SELECT id, email, name, password_hash FROM users WHERE email = %s",
        (email.lower(),)
    )
    
    if not user:
        return {"success": False, "error": "Invalid email or password"}
    
    # Verify password
    if bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
        return {
            "success": True,
            "user": {
                "id": user['id'],
                "email": user['email'],
                "name": user['name']
            }
        }
    
    return {"success": False, "error": "Invalid email or password"}

def get_user_by_id(user_id: int) -> dict:
    """Get user by ID"""
    user = db.fetch_one(
        "SELECT id, email, name, created_at FROM users WHERE id = %s",
        (user_id,)
    )
    return dict(user) if user else None
