"""
Chart Route - Astrological chart calculation endpoint
Simplified implementation without external dependencies
"""
from flask import Blueprint, request, jsonify
import math
from datetime import datetime

# Planet orbital periods (in days)
ORBITAL_PERIODS = {
    'Sun': 365.25,
    'Moon': 27.3217,
    'Mercury': 87.97,
    'Venus': 224.7,
    'Mars': 686.98,
    'Jupiter': 4332.59,
    'Saturn': 10759.22,
    'Uranus': 30685.4,
    'Neptune': 60189.0,
    'Pluto': 90465.0,
}

# Planet symbols
PLANET_SYMBOLS = {
    'Sun': '☉', 'Moon': '☽', 'Mercury': '☿', 'Venus': '♀', 'Mars': '♂',
    'Jupiter': '♃', 'Saturn': '♄', 'Uranus': '♅', 'Neptune': '♆', 'Pluto': '♇',
}

# Zodiac signs
ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
]

# Approximate planet starting positions (at J2000.0 - Jan 1, 2000)
PLANET_START_POSITIONS = {
    'Sun': 280.46,
    'Moon': 218.32,
    'Mercury': 252.25,
    'Venus': 181.98,
    'Mars': 355.45,
    'Jupiter': 34.33,
    'Saturn': 50.08,
    'Uranus': 314.05,
    'Neptune': 304.88,
    'Pluto': 238.96,
}

def get_zodiac_sign(longitude):
    """Get zodiac sign from longitude (0-360)"""
    sign_index = int(longitude / 30) % 12
    degree = longitude % 30
    return ZODIAC_SIGNS[sign_index], degree

def calculate_planet_position(planet_name, days_since_j2000):
    """Calculate simplified planet position"""
    if planet_name == 'Moon':
        position = (218.32 + 13.1763966 * days_since_j2000) % 360
    elif planet_name in ORBITAL_PERIODS:
        period = ORBITAL_PERIODS[planet_name]
        start = PLANET_START_POSITIONS.get(planet_name, 0)
        position = (start + (360 / period) * days_since_j2000) % 360
    else:
        position = 0
    return position

def calculate_planets(birth_date, birth_time, latitude, longitude):
    """Calculate planet positions for given birth data"""
    results = []
    
    j2000 = datetime(2000, 1, 1, 12, 0, 0)
    
    date_parts = birth_date.split('-')
    year = int(date_parts[0])
    month = int(date_parts[1])
    day = int(date_parts[2])
    
    time_parts = birth_time.split(':')
    hour = int(time_parts[0])
    minute = int(time_parts[1]) if len(time_parts) > 1 else 0
    
    birth_dt = datetime(year, month, day, hour, minute)
    delta = birth_dt - j2000
    days_since_j2000 = delta.days + delta.seconds / 86400.0
    
    for planet_name in ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 
                        'Saturn', 'Uranus', 'Neptune', 'Pluto']:
        longitude_pos = calculate_planet_position(planet_name, days_since_j2000)
        sign, sign_degree = get_zodiac_sign(longitude_pos)
        house = int(longitude_pos / 30) + 1
        retrograde = planet_name in ['Uranus', 'Neptune', 'Pluto']
        
        results.append({
            'id': planet_name.lower(),
            'name': planet_name,
            'symbol': PLANET_SYMBOLS.get(planet_name, '●'),
            'sign': sign,
            'signDegree': sign_degree,
            'longitude': longitude_pos,
            'house': house,
            'speed': 0.0,
            'retrograde': retrograde
        })
    
    # Add Chiron
    chiron_longitude = (304.87 + 50.29 * days_since_j2000 / 365.25) % 360
    sign, sign_degree = get_zodiac_sign(chiron_longitude)
    results.append({
        'id': 'chiron',
        'name': 'Chiron',
        'symbol': '⚷',
        'sign': sign,
        'signDegree': sign_degree,
        'longitude': chiron_longitude,
        'house': int(chiron_longitude / 30) + 1,
        'speed': 0.0,
        'retrograde': False
    })
    
    # Add North Node and South Node
    north_node = (0.0 + 0.053 * days_since_j2000) % 360
    sign, sign_degree = get_zodiac_sign(north_node)
    south_node = (north_node + 180) % 360
    sign_south, sign_degree_south = get_zodiac_sign(south_node)
    
    results.append({
        'id': 'north_node',
        'name': 'North Node',
        'symbol': '☊',
        'sign': sign,
        'signDegree': sign_degree,
        'longitude': north_node,
        'house': int(north_node / 30) + 1,
        'speed': 0.0,
        'retrograde': True
    })
    
    results.append({
        'id': 'south_node',
        'name': 'South Node',
        'symbol': '☋',
        'sign': sign_south,
        'signDegree': sign_degree_south,
        'longitude': south_node,
        'house': int(south_node / 30) + 1,
        'speed': 0.0,
        'retrograde': True
    })
    
    return results

def calculate_houses(ascendant):
    """Calculate house cusps based on Ascendant"""
    houses = []
    for i in range(12):
        cusp = (ascendant + i * 30) % 360
        sign, sign_degree = get_zodiac_sign(cusp)
        houses.append({
            'id': i + 1,
            'sign': sign,
            'cusp': cusp,
            'signDegree': sign_degree,
            'size': 30
        })
    return houses

def calculate_aspects(planets):
    """Calculate aspects between planets"""
    aspects = []
    aspect_types = [
        ('conjunction', 0, 8),
        ('sextile', 60, 6),
        ('square', 90, 7),
        ('trine', 120, 7),
        ('opposition', 180, 8),
    ]
    
    planet_list = [(p['name'], p['longitude']) for p in planets]
    
    for i in range(len(planet_list)):
        name1, lon1 = planet_list[i]
        for j in range(i + 1, len(planet_list)):
            name2, lon2 = planet_list[j]
            diff = abs(lon1 - lon2)
            if diff > 180:
                diff = 360 - diff
            
            for aspect_type, ideal_angle, orb in aspect_types:
                if abs(diff - ideal_angle) <= orb:
                    aspects.append({
                        'id': f"{name1.lower()}_{name2.lower()}_{aspect_type}",
                        'planet1': name1,
                        'planet2': name2,
                        'type': aspect_type,
                        'angle': round(diff, 2),
                        'orb': round(abs(diff - ideal_angle), 2),
                        'applying': True
                    })
                    break
    
    return aspects

def calculate_angles(ascendant):
    """Calculate angles (ASC, DC, MC, IC)"""
    return {
        'ascendant': ascendant,
        'descendant': (ascendant + 180) % 360,
        'midheaven': (ascendant + 90) % 360,
        'imum_coeli': (ascendant + 270) % 360,
    }

def calculate_angles_data(angles):
    """Calculate angles data for chart"""
    result = []
    angle_names = {
        'ascendant': 'Ascendant',
        'descendant': 'Descendant',
        'midheaven': 'Midheaven',
        'imum_coeli': 'Imum Coeli'
    }
    
    for key, name in angle_names.items():
        longitude = angles.get(key, 0)
        sign, sign_degree = get_zodiac_sign(longitude)
        result.append({
            'id': key,
            'name': name,
            'longitude': longitude,
            'sign': sign,
            'signDegree': sign_degree
        })
    
    return result

def calculate_ascendant(birth_date, birth_time, latitude, longitude):
    """Calculate approximate Ascendant"""
    j2000 = datetime(2000, 1, 1, 12, 0, 0)
    
    date_parts = birth_date.split('-')
    year = int(date_parts[0])
    month = int(date_parts[1])
    day = int(date_parts[2])
    
    time_parts = birth_time.split(':')
    hour = int(time_parts[0])
    minute = int(time_parts[1]) if len(time_parts) > 1 else 0
    
    birth_dt = datetime(year, month, day, hour, minute)
    delta = birth_dt - j2000
    days = delta.days + delta.seconds / 86400.0
    
    gmst = (18.697374558 + 24.06570982441908 * days) % 24
    lst = gmst * 15
    ascendant = (lst + longitude) % 360
    
    return ascendant

# Create Blueprint
chart_bp = Blueprint('chart', __name__)

@chart_bp.route('/api/chart/calculate', methods=['POST'])
def calculate_chart():
    """Calculate astrological chart from birth data"""
    try:
        data = request.get_json()
        
        birth_date = data.get('birthDate')
        birth_time = data.get('birthTime', '12:00')
        latitude = float(data.get('latitude', 0))
        longitude = float(data.get('longitude', 0))
        timezone_str = data.get('timezone', 'UTC')
        
        if not birth_date:
            return jsonify({'error': 'birthDate is required'}), 400
        
        try:
            date_parts = birth_date.split('-')
            year = int(date_parts[0])
            month = int(date_parts[1])
            day = int(date_parts[2])
        except:
            return jsonify({'error': 'Invalid birthDate format. Use YYYY-MM-DD'}), 400
        
        try:
            time_parts = birth_time.split(':')
            hour = int(time_parts[0])
            minute = int(time_parts[1]) if len(time_parts) > 1 else 0
        except:
            hour, minute = 12, 0
        
        ascendant = calculate_ascendant(birth_date, birth_time, latitude, longitude)
        planets = calculate_planets(birth_date, birth_time, latitude, longitude)
        houses = calculate_houses(ascendant)
        aspects = calculate_aspects(planets)
        angles = calculate_angles(ascendant)
        angles_data = calculate_angles_data(angles)
        
        chart_data = {
            'id': f'chart_{year}{month:02d}{day:02d}',
            'subject': {
                'name': 'Birth Chart',
                'birthDate': birth_date,
                'birthTime': birth_time,
                'location': f'{latitude}, {longitude}',
                'latitude': latitude,
                'longitude': longitude,
                'timezone': timezone_str
            },
            'planets': planets,
            'houses': houses,
            'aspects': aspects,
            'angles': angles_data
        }
        
        return jsonify(chart_data)
    
    except Exception as e:
        print(f"Error calculating chart: {e}")
        return jsonify({'error': str(e)}), 500

@chart_bp.route('/api/chart/calculate', methods=['GET'])
def calculate_chart_get():
    """Calculate chart using query parameters (for testing)"""
    try:
        birth_date = request.args.get('birthDate')
        birth_time = request.args.get('birthTime', '12:00')
        latitude = float(request.args.get('latitude', 0))
        longitude = float(request.args.get('longitude', 0))
        timezone_str = request.args.get('timezone', 'UTC')
        
        if not birth_date:
            return jsonify({'error': 'birthDate is required'}), 400
        
        ascendant = calculate_ascendant(birth_date, birth_time, latitude, longitude)
        planets = calculate_planets(birth_date, birth_time, latitude, longitude)
        houses = calculate_houses(ascendant)
        aspects = calculate_aspects(planets)
        angles = calculate_angles(ascendant)
        angles_data = calculate_angles_data(angles)
        
        chart_data = {
            'id': f'chart_{birth_date}',
            'subject': {
                'name': 'Birth Chart',
                'birthDate': birth_date,
                'birthTime': birth_time,
                'location': f'{latitude}, {longitude}',
                'latitude': latitude,
                'longitude': longitude,
                'timezone': timezone_str
            },
            'planets': planets,
            'houses': houses,
            'aspects': aspects,
            'angles': angles_data
        }
        
        return jsonify(chart_data)
    
    except Exception as e:
        print(f"Error calculating chart: {e}")
        return jsonify({'error': str(e)}), 500
