from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Import routes
from src.routes.location import location_bp
app.register_blueprint(location_bp, url_prefix='/api/location')

@app.route('/api/health')
def health_check():
    return jsonify({'status': 'ok', 'message': 'JStar API is running'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
