# Chatbot Route - Zodiac Q&A endpoint
from flask import Blueprint, request, jsonify
from ..data import get_zodiac_info

chatbot_bp = Blueprint('chatbot', __name__)

# English keywords for language detection
ENGLISH_KEYWORDS = [
    "what", "how", "who", "when", "where", "tell", "about",
    "is", "are", "the", "and", "love", "career", "personality",
    "aries", "taurus", "gemini", "cancer", "leo", "virgo",
    "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
    "hello", "hi", "hey"
]

# Vietnamese keywords for language detection
VIETNAMESE_KEYWORDS = [
    "xin chào", "chào", "hello", "hi", "ban đầu", "là gì", "như thế nào",
    "ngày sinh", "tính cách", "đặc điểm", "tình yêu", "sự nghiệp",
    "nguyên tố"
]


def detect_language(message: str) -> str:
    """Detect if the message is in English or Vietnamese"""
    message_lower = message.lower()
    
    # Check for Vietnamese keywords first
    for keyword in VIETNAMESE_KEYWORDS:
        if keyword in message_lower:
            return "vi"
    
    # Check for English keywords
    for keyword in ENGLISH_KEYWORDS:
        if keyword in message_lower:
            return "en"
    
    # Default to English
    return "en"


def format_zodiac_response(info: dict, language: str) -> str:
    """Format zodiac sign information into a readable response"""
    if language == "vi":
        return format_vietnamese_response(info)
    else:
        return format_english_response(info)


def format_english_response(info: dict) -> str:
    """Format response in English"""
    reply = f"🌟 **{info['name']}** {info['symbol']}\n\n"
    reply += f"📅 **Dates:** {info['dates']}\n\n"
    reply += f"🔥 **Element:** {info['element']}\n\n"
    reply += f"🪐 **Ruling Planet:** {info['planet']}\n\n"
    reply += f"✨ **Personality Traits:** {info['traits']}\n\n"
    reply += f"💪 **Strengths:** {info['strengths']}\n\n"
    reply += f"⚠️ **Weaknesses:** {info['weaknesses']}\n\n"
    reply += f"💼 **Career:** {info['career']}\n\n"
    reply += f"💕 **Love:** {info['love']}\n\n"
    reply += f"💫 {info['description']}\n\n"
    reply += "━━━━━━━━━━━━━━━━━━━━\n"
    reply += "Would you like to learn more about another zodiac sign?"
    return reply


def format_vietnamese_response(info: dict) -> str:
    """Format response in Vietnamese"""
    reply = f"🌟 **{info['name']}** {info['symbol']}\n\n"
    reply += f"📅 **Ngày sinh:** {info['dates']}\n\n"
    reply += f"🔥 **Nguyên tố:** {info['element']}\n\n"
    reply += f"🪐 **Hành tinh cai quản:** {info['planet']}\n\n"
    reply += f"✨ **Đặc điểm tính cách:** {info['traits']}\n\n"
    reply += f"💪 **Điểm mạnh:** {info['strengths']}\n\n"
    reply += f"⚠️ **Điểm yếu:** {info['weaknesses']}\n\n"
    reply += f"💼 **Sự nghiệp:** {info['career']}\n\n"
    reply += f"💕 **Tình yêu:** {info['love']}\n\n"
    reply += f"💫 {info['description']}\n\n"
    reply += "━━━━━━━━━━━━━━━━━━━━\n"
    reply += "Bạn có muốn biết thêm về cung hoàng đạo nào khác không?"
    return reply


def get_welcome_message(language: str) -> str:
    """Get welcome message based on language"""
    if language == "vi":
        return (
            "🌟 **Xin chào! Tôi là trợ lý chiêm tinh của JStar!** ✨\n\n"
            "Tôi có thể giúp bạn tìm hiểu về các cung hoàng đạo một cách chi tiết!\n\n"
            "📚 **Bạn có thể hỏi tôi như:**\n"
            "• 'Aries là gì?' / 'Cho tôi biết về Aries'\n"
            "• 'Tính cách của Leo như thế nào?'\n"
            "• 'Ngày sinh của Scorpio là khi nào?'\n"
            "• 'Nguyên tố của các cung hoàng đạo'\n"
            "• 'Tình yêu của Cancer ra sao?'\n"
            "• 'Sự nghiệp phù hợp với Taurus'\n\n"
            "🌟 **12 Cung hoàng đạo:**\n"
            "Aries, Taurus, Gemini, Cancer, Leo, Virgo,\nLibra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces\n\n"
            "Bạn muốn tìm hiểu về cung hoàng đạo nào?"
        )
    else:
        return (
            "🌟 **Hello! I am JStar's astrology assistant!** ✨\n\n"
            "I can help you learn about the zodiac signs in detail!\n\n"
            "📚 **You can ask me like:**\n"
            "• 'Tell me about Aries'\n"
            "• 'What is Leo's personality?'\n"
            "• 'When is Scorpio's birthday?'\n"
            "• 'Elements of zodiac signs'\n"
            "• 'Love and Cancer'\n"
            "• 'Career for Taurus'\n\n"
            "🌟 **12 Zodiac Signs:**\n"
            "Aries, Taurus, Gemini, Cancer, Leo, Virgo,\nLibra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces\n\n"
            "Which zodiac sign would you like to learn about?"
        )


def get_topic_response(topic: str, language: str) -> str | None:
    """Get response for specific topics (elements, love, career, etc.)"""
    if language == "vi":
        return get_vietnamese_topic_response(topic)
    else:
        return get_english_topic_response(topic)


def get_english_topic_response(topic: str) -> str | None:
    """Get English response for topics"""
    if "element" in topic:
        return (
            "🔥🌊🌬️🌍 **Elements of the 12 Zodiac Signs:**\n\n"
            "━━━━━━━━━━━━━━━━━━━━\n\n"
            "🔥 **FIRE** (Aries, Leo, Sagittarius)\n"
            "→ Energetic, passionate, courageous\n\n"
            "🌍 **EARTH** (Taurus, Virgo, Capricorn)\n"
            "→ Practical, stable, reliable\n\n"
            "💨 **AIR** (Gemini, Libra, Aquarius)\n"
            "→ Intellectual, communicative, creative\n\n"
            "💧 **WATER** (Cancer, Scorpio, Pisces)\n"
            "→ Emotional, intuitive, deep\n\n"
            "Which element are you interested in?"
        )
    elif "love" in topic or "romance" in topic:
        return (
            "💕 **Love and the Zodiac Signs:**\n\n"
            "• Aries: Passionate, goes all in\n"
            "• Taurus: Loyal, needs security\n"
            "• Gemini: Needs intellectual stimulation\n"
            "• Cancer: Devoted, family first\n"
            "• Leo: Needs to be adored\n"
            "• Virgo: Shows love through actions\n"
            "• Libra: Seeks harmony\n"
            "• Scorpio: Deep and intense\n"
            "• Sagittarius: Needs freedom\n"
            "• Capricorn: Serious and committed\n"
            "• Aquarius: Needs independence\n"
            "• Pisces: Romantic and dreamy\n\n"
            "Which sign would you like to know more about?"
        )
    elif "career" in topic or "job" in topic:
        return (
            "💼 **Career and the Zodiac Signs:**\n\n"
            "• Aries: Business, sports, leadership\n"
            "• Taurus: Finance, real estate, art\n"
            "• Gemini: Media, journalism, education\n"
            "• Cancer: Healthcare, education\n"
            "• Leo: Creative, entertainment\n"
            "• Virgo: Healthcare, accounting, research\n"
            "• Libra: Art, law, diplomacy\n"
            "• Scorpio: Research, psychology, finance\n"
            "• Sagittarius: Travel, education, publishing\n"
            "• Capricorn: Management, finance, law\n"
            "• Aquarius: Technology, science\n"
            "• Pisces: Art, music, psychology\n\n"
            "Which sign interests you?"
        )
    elif "birthday" in topic or "dates" in topic:
        return (
            "📅 **Birth Dates of 12 Zodiac Signs:**\n\n"
            "🔥 Aries: March 21 - April 19\n"
            "🌿 Taurus: April 20 - May 20\n"
            "👯 Gemini: May 21 - June 20\n"
            "🦀 Cancer: June 21 - July 22\n"
            "🦁 Leo: July 23 - August 22\n"
            "👸 Virgo: August 23 - September 22\n"
            "⚖️ Libra: September 23 - October 22\n"
            "🦂 Scorpio: October 23 - November 21\n"
            "🏹 Sagittarius: November 22 - December 21\n"
            "🐐 Capricorn: December 22 - January 19\n"
            "🏺 Aquarius: January 20 - February 18\n"
            "🐟 Pisces: February 19 - March 20\n\n"
            "Which sign are you?"
        )
    elif "personality" in topic or "traits" in topic or "character" in topic:
        return (
            "📖 **Personality of the Zodiac Signs:**\n\n"
            "🔥 **Fire Signs:** Aries, Leo, Sagittarius - Energetic, passionate\n\n"
            "🌍 **Earth Signs:** Taurus, Virgo, Capricorn - Practical, stable\n\n"
            "💨 **Air Signs:** Gemini, Libra, Aquarius - Intellectual, communicative\n\n"
            "💧 **Water Signs:** Cancer, Scorpio, Pisces - Emotional, intuitive\n\n"
            "Which sign would you like to know more about?"
        )
    elif any(word in topic for word in ["hello", "hi", "hey", "start", "begin"]):
        return get_welcome_message("en")
    return None


def get_vietnamese_topic_response(topic: str) -> str | None:
    """Get Vietnamese response for topics"""
    if "nguyên tố" in topic or "element" in topic:
        return (
            "🔥🌊🌬️🌍 **Nguyên tố của 12 cung hoàng đạo:**\n\n"
            "━━━━━━━━━━━━━━━━━━━━\n\n"
            "🔥 **LỬA** (Aries, Leo, Sagittarius)\n"
            "→ Năng động, nhiệt huyết, can đảm\n\n"
            "🌍 **ĐẤT** (Taurus, Virgo, Capricorn)\n"
            "→ Thực tế, ổn định, đáng tin cậy\n\n"
            "💨 **KHÔNG KHÍ** (Gemini, Libra, Aquarius)\n"
            "→ Tư duy, giao tiếp, sáng tạo\n\n"
            "💧 **NƯỚC** (Cancer, Scorpio, Pisces)\n"
            "→ Cảm xúc, trực giác, sâu sắc\n\n"
            "Bạn thuộc cung nguyên tố nào?"
        )
    elif "tình yêu" in topic or "love" in topic:
        return (
            "💕 **Tình yêu và các cung hoàng đạo:**\n\n"
            "• Aries: Nồng nhiệt, chủ động, hết mình\n"
            "• Taurus: Chung thủy, cần cảm giác an toàn\n"
            "• Gemini: Cần kích thích trí tuệ\n"
            "• Cancer: Tận tâm, gia đình là trên hết\n"
            "• Leo: Cần được ngưỡng mộ\n"
            "• Virgo: Thể hiện qua hành động\n"
            "• Libra: Tìm kiếm sự cân bằng\n"
            "• Scorpio: Mãnh liệt và sâu sắc\n"
            "• Sagittarius: Cần tự do\n"
            "• Capricorn: Nghiêm túc và chu đáo\n"
            "• Aquarius: Cần sự độc lập\n"
            "• Pisces: Lãng mạn và mơ mộng\n\n"
            "Bạn muốn biết chi tiết về cung nào?"
        )
    elif "sự nghiệp" in topic or "career" in topic or "nghề" in topic:
        return (
            "💼 **Sự nghiệp và các cung hoàng đạo:**\n\n"
            "• Aries: Kinh doanh, thể thao, lãnh đạo\n"
            "• Taurus: Tài chính, bất động sản, nghệ thuật\n"
            "• Gemini: Truyền thông, báo chí, giáo dục\n"
            "• Cancer: Y tế, giáo dục, bất động sản\n"
            "• Leo: Sáng tạo, giải trí, quản lý\n"
            "• Virgo: Y tế, kế toán, nghiên cứu\n"
            "• Libra: Nghệ thuật, luật, ngoại giao\n"
            "• Scorpio: Nghiên cứu, tâm lý, tài chính\n"
            "• Sagittarius: Du lịch, giáo dục, xuất bản\n"
            "• Capricorn: Quản lý, tài chính, luật\n"
            "• Aquarius: Công nghệ, khoa học\n"
            "• Pisces: Nghệ thuật, âm nhạc, tâm lý\n\n"
            "Bạn thuộc cung nào?"
        )
    elif "ngày sinh" in topic or "sinh ngày" in topic or "sinh" in topic:
        return (
            "📅 **Ngày sinh của 12 cung hoàng đạo:**\n\n"
            "🔥 Aries: 21/3 - 19/4\n"
            "🌿 Taurus: 20/4 - 20/5\n"
            "👯 Gemini: 21/5 - 20/6\n"
            "🦀 Cancer: 21/6 - 22/7\n"
            "🦁 Leo: 23/7 - 22/8\n"
            "👸 Virgo: 23/8 - 22/9\n"
            "⚖️ Libra: 23/9 - 22/10\n"
            "🦂 Scorpio: 23/10 - 21/11\n"
            "🏹 Sagittarius: 22/11 - 21/12\n"
            "🐐 Capricorn: 22/12 - 19/1\n"
            "🏺 Aquarius: 20/1 - 18/2\n"
            "🐟 Pisces: 19/2 - 20/3\n\n"
            "Bạn thuộc cung nào?"
        )
    elif "tính cách" in topic or "đặc điểm" in topic or "tính" in topic:
        return (
            "📖 **Tính cách của các cung hoàng đạo:**\n\n"
            "🔥 **Cung Lửa:** Aries, Leo, Sagittarius - Năng động, nhiệt huyết\n\n"
            "🌍 **Cung Đất:** Taurus, Virgo, Capricorn - Thực tế, ổn định\n\n"
            "💨 **Cung Không khí:** Gemini, Libra, Aquarius - Tư duy, giao tiếp\n\n"
            "💧 **Cung Nước:** Cancer, Scorpio, Pisces - Cảm xúc, trực giác\n\n"
            "Bạn muốn biết chi tiết về cung nào?"
        )
    elif any(word in topic for word in ["xin chào", "chào", "hello", "hi", "hey", "ban đầu"]):
        return get_welcome_message("vi")
    return None


def get_fallback_response(language: str) -> str:
    """Get fallback response when no specific topic is matched"""
    if language == "vi":
        return (
            "🌟 **Tôi có thể giúp bạn tìm hiểu về các cung hoàng đạo!**\n\n"
            "📚 **Bạn có thể hỏi tôi như:**\n"
            "• 'Aries là gì?' / 'Cho tôi biết về Aries'\n"
            "• 'Tính cách của Leo như thế nào?'\n"
            "• 'Ngày sinh của Scorpio là khi nào?'\n"
            "• 'Nguyên tố của các cung hoàng đạo'\n"
            "• 'Tình yêu của Cancer ra sao?'\n"
            "• 'Sự nghiệp phù hợp với Taurus'\n\n"
            "🌟 **Hoặc bạn có thể chọn:**\n"
            "Aries, Taurus, Gemini, Cancer, Leo, Virgo,\nLibra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces\n\n"
            "Bạn muốn biết về cung hoàng đạo nào?"
        )
    else:
        return (
            "🌟 **I can help you learn about the zodiac signs!**\n\n"
            "📚 **You can ask me like:**\n"
            "• 'Tell me about Aries'\n"
            "• 'What is Leo's personality?'\n"
            "• 'When is Scorpio's birthday?'\n"
            "• 'Elements of zodiac signs'\n"
            "• 'Love and Cancer'\n"
            "• 'Career for Taurus'\n\n"
            "🌟 **Or choose from:**\n"
            "Aries, Taurus, Gemini, Cancer, Leo, Virgo,\nLibra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces\n\n"
            "Which zodiac sign would you like to learn about?"
        )


@chatbot_bp.route('/api/chatbot', methods=['POST'])
def chatbot_endpoint():
    """
    Chatbot endpoint for zodiac questions.
    
    Request body:
        message: User's question
    
    Returns:
        JSON response with chatbot reply
    """
    data = request.get_json()
    user_message = data.get('message', '').lower()
    
    # Detect language
    language = detect_language(user_message)
    
    # Get zodiac data for the detected language
    zodiac_data = get_zodiac_info(language)
    
    # Check if user is asking about a specific zodiac sign
    response = None
    for sign, info in zodiac_data.items():
        if sign in user_message or info["name"].lower() in user_message:
            response = format_zodiac_response(info, language)
            break
    
    # If no specific sign found, check for topics
    if not response:
        response = get_topic_response(user_message, language)
    
    # If still no response, use fallback
    if not response:
        response = get_fallback_response(language)
    
    return jsonify({'reply': response})

