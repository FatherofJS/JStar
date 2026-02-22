from flask import Blueprint, request, jsonify
import requests
import time

location_bp = Blueprint('location', __name__)

NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org"
LAST_REQUEST_TIME = {"time": 0}
MIN_REQUEST_INTERVAL = 1.1


def rate_limit():
    """Simple rate limiter for Nominatim API"""
    current_time = time.time()
    elapsed = current_time - LAST_REQUEST_TIME["time"]
    if elapsed < MIN_REQUEST_INTERVAL:
        time.sleep(MIN_REQUEST_INTERVAL - elapsed)
    LAST_REQUEST_TIME["time"] = time.time()


@location_bp.route('/search', methods=['GET'])
def search_location():
    """
    Search for locations by query string.
    
    Query params:
        q: search query (city name, etc.)
        limit: max number of results (default: 5)
    
    Returns list of locations with lat, lon, display_name, timezone info
    """
    query = request.args.get('q', '').strip().lower()
    
    if not query or len(query) < 2:
        return jsonify({'error': 'Query must be at least 2 characters'}), 400
    
    limit = min(int(request.args.get('limit', 5)), 10)
    
    try:
        rate_limit()
        
        headers = {
            'User-Agent': 'JStar-AstrologyApp/1.0',
            'Accept-Language': 'en-US,en;q=0.9'
        }
        
        params = {
            'q': query,
            'format': 'json',
            'addressdetails': 1,
            'limit': limit
        }
        
        response = requests.get(
            f"{NOMINATIM_BASE_URL}/search",
            params=params,
            headers=headers,
            timeout=10
        )
        response.raise_for_status()
        data = response.json()
        
        results = []
        for item in data:
            city_data = extract_city_info(item)
            if city_data and is_valid_city(city_data):
                results.append(city_data)
        
        return jsonify({'success': True, 'data': results})
        
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500


def extract_city_info(item):
    """Extract clean city information from Nominatim response"""
    
    address = item.get('address', {})
    
    name = (
        address.get('city') or 
        address.get('town') or 
        address.get('village') or 
        address.get('municipality') or 
        address.get('county') or
        item.get('display_name', '').split(',')[0]
    )
    
    country_code = address.get('country_code', '')
    country_name = address.get('country', '')
    state = address.get('state', '')
    
    timezone = "UTC"
    # Note: For production, you'd want to use a proper timezone API
    # This is a simplified version
    
    return {
        'id': f"{item['lat']}_{item['lon']}".replace('.', '_'),
        'name': name.strip() if name else '',
        'latitude': float(item['lat']),
        'longitude': float(item['lon']),
        'display_name': item.get('display_name', ''),
        'country_code': country_code.upper(),
        'country': country_name,
        'administrative_area': state,
        'timezone': timezone
    }


def is_valid_city(location_dict):
    """Filter out invalid or too generic results"""
    if not location_dict or not location_dict.get('name'):
        return False
    
    # Filter out very short names or generic entries
    if len(location_dict.get('name', '')) < 2:
        return False
        
    return True


@location_bp.route('/reverse', methods=['GET'])
def reverse_geocode():
    """
    Reverse geocode: get location details from lat/lon
    
    Query params:
        lat: latitude
        lon: longitude
    """
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    
    if not lat or not lon:
        return jsonify({'error': 'Both lat and lon are required'}), 400
    
    try:
        rate_limit()
        
        headers = {
            'User-Agent': 'JStar-AstrologyApp/1.0',
            'Accept-Language': 'en-US,en;q=0.9'
        }
        
        params = {
            'lat': lat,
            'lon': lon,
            'format': 'json',
            'addressdetails': 1
        }
        
        response = requests.get(
            f"{NOMINATIM_BASE_URL}/reverse",
            params=params,
            headers=headers,
            timeout=10
        )
        response.raise_for_status()
        data = response.json()
        
        processed = process_reverse(data)
        
        return jsonify({'success': True, 'data': processed})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def process_reverse(data):
    """Process reverse geocoding response"""
    if not data:
        return None
    
    address = data.get('address', {})
    
    name = (
        address.get('city') or 
        address.get('town') or 
        address.get('village') or 
        address.get('municipality') or 
        address.get('suburb') or
        address.get('county') or
        ''
    )
    
    country_code = address.get('country_code', '')
    country_name = address.get('country', '')
    state = address.get('state', '')
    
    return {
        'name': name,
        'display_name': data.get('display_name', ''),
        'country_code': country_code.upper(),
        'country': country_name,
        'administrative_area': state,
        'latitude': float(data.get('lat', 0)),
        'longitude': float(data.get('lon', 0))
    }
