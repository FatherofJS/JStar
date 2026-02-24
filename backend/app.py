from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Get CORS origins from environment variable
cors_origins = os.environ.get('CORS_ORIGINS', '*')
# Convert comma-separated string to list
origins_list = [origin.strip() for origin in cors_origins.split(',')] if cors_origins != '*' else '*'

# Allow all origins for development
CORS(app, origins='*', supports_credentials=True)

# Import routes
from src.routes import location_bp, features_bp, chatbot_bp
app.register_blueprint(location_bp, url_prefix='/api/location')
app.register_blueprint(features_bp)
app.register_blueprint(chatbot_bp)


@app.route('/api/health')
def health_check():
    return jsonify({'status': 'ok', 'message': 'JStar API is running'})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)

