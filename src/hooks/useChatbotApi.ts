// Chatbot API hook - Handle chatbot backend communication

interface ChatbotResponse {
  reply: string;
}

interface UseChatbotApiReturn {
  sendMessage: (text: string) => Promise<{ reply: string; isFallback: boolean }>;
  isLoading: boolean;
  error: string | null;
}

import { useState, useCallback } from 'react';

const API_URL = 'http://localhost:5001/api/chatbot';

export function useChatbotApi(): UseChatbotApiReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (text: string): Promise<{ reply: string; isFallback: boolean }> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text.trim() }),
      });

      if (!response.ok) {
        throw new Error('API error');
      }

      const data: ChatbotResponse = await response.json();
      return { reply: data.reply, isFallback: false };
    } catch (err) {
      console.log('API unavailable, using fallback mode');
      setError('API unavailable');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { sendMessage, isLoading, error };
}

// Fallback responses by language
export type ChatLanguage = 'en' | 'vi';

export interface FallbackResponses {
  getResponse: (message: string, lang: ChatLanguage) => string;
  getWelcomeMessage: (lang: ChatLanguage) => string;
  getHelpMessage: (lang: ChatLanguage) => string;
  getQuickReplies: (lang: ChatLanguage) => string[];
}

export function useFallbackResponses(): FallbackResponses {
  const quickRepliesVi = [
    "Aries là gì?",
    "Tính cách Leo",
    "Ngày sinh Scorpio",
    "Tình yêu Cancer",
  ];

  const quickRepliesEn = [
    "Tell me about Aries",
    "Leo personality",
    "Scorpio birthday",
    "Cancer love",
  ];

  const defaultWelcomeVi = "🌟 **Xin chào! Tôi là trợ lý chiêm tinh của JStar!** ✨\n\nTôi có thể giúp bạn tìm hiểu về các cung hoàng đạo!\n\n📚 **Bạn có thể hỏi:**\n• 'Aries là gì?'\n• 'Tính cách Leo'\n• 'Ngày sinh Scorpio'\n• 'Nguyên tố của các cung'\n• 'Tình yêu Cancer'\n\n🌟 **12 Cung hoàng đạo:**\nAries, Taurus, Gemini, Cancer, Leo, Virgo,\nLibra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces\n\nBạn muốn tìm hiểu về cung nào?";

  const defaultWelcomeEn = "🌟 **Hello! I am JStar's astrology assistant!** ✨\n\nI can help you learn about the zodiac signs!\n\n📚 **You can ask:**\n• 'Tell me about Aries'\n• 'Leo personality'\n• 'Scorpio birthday'\n• 'Elements of zodiac'\n• 'Cancer love'\n\n🌟 **12 Zodiac Signs:**\nAries, Taurus, Gemini, Cancer, Leo, Virgo,\nLibra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces\n\nWhich zodiac sign would you like to learn about?";

  const defaultHelpVi = "🌟 **Tôi có thể giúp bạn về các cung hoàng đạo!**\n\nBạn có thể hỏi về:\n• 'Aries là gì?'\n• 'Tính cách Leo'\n• 'Ngày sinh Scorpio'\n• 'Nguyên tố'\n• 'Tình yêu'\n\nBạn muốn biết về cung nào?";

  const defaultHelpEn = "🌟 **I can help you with zodiac signs!**\n\nYou can ask about:\n• 'Tell me about Aries'\n• 'Leo personality'\n• 'Scorpio birthday'\n• 'Elements'\n• 'Love'\n\nWhich sign interests you?";

  // Detailed fallback responses - Vietnamese
  const fallbackResponsesVi: Record<string, string> = {
    "aries": "🌟 **Aries (Bạch Dương)** ♈\n\n📅 **Ngày sinh:** 21/3 - 19/4\n🔥 **Nguyên tố:** Lửa\n🪐 **Hành tinh:** Sao Hỏa\n✨ **Tính cách:** Năng động, can đảm, nhiệt huyết\n💪 **Điểm mạnh:** Dũng cảm, tự tin, trung thực\n⚠️ **Điểm yếu:** Thiếu kiên nhẫn, bốc đồng\n💼 **Sự nghiệp:** Kinh doanh, thể thao, lãnh đạo\n💕 **Tình yêu:** Nồng nhiệt, hết mình\n💫 Aries là cung đầu tiên, tượng trưng cho sự khởi đầu.\n\nBạn có muốn biết thêm về cung nào khác?",
    "taurus": "🌟 **Taurus (Kim Ngưu)** ♉\n\n📅 **Ngày sinh:** 20/4 - 20/5\n🔥 **Nguyên tố:** Đất\n🪐 **Hành tinh:** Sao Kim\n✨ **Tính cách:** Kiên nhẫn, đáng tin cậy, thực tế\n💪 **Điểm mạnh:** Đáng tin cậy, chăm chỉ, trung thành\n⚠️ **Điểm yếu:** Bướng bỉnh, ích kỷ\n💼 **Sự nghiệp:** Tài chính, bất động sản, nghệ thuật\n💕 **Tình yêu:** Chung thủy, cần an toàn\n💫 Taurus tượng trưng cho sự ổn định.\n\nBạn có muốn biết thêm về cung nào khác?",
    "gemini": "🌟 **Gemini (Song Tử)** ♊\n\n📅 **Ngày sinh:** 21/5 - 20/6\n🔥 **Nguyên tố:** Không khí\n🪐 **Hành tinh:** Sao Thủy\n✨ **Tính cách:** Linh hoạt, tò mò, giao tiếp tốt\n💪 **Điểm mạnh:** Thông minh, linh hoạt\n⚠️ **Điểm yếu:** Hay lo âu, thiếu kiên nhẫn\n💼 **Sự nghiệp:** Truyền thông, báo chí, giáo dục\n💕 **Tình yêu:** Cần kích thích trí tuệ\n💫 Gemini được cai quản bởi Sao Thủy.\n\nBạn có muốn biết thêm về cung nào khác?",
    "cancer": "🌟 **Cancer (Cự Giải)** ♋\n\n📅 **Ngày sinh:** 21/6 - 22/7\n🔥 **Nguyên tố:** Nước\n🪐 **Hành tinh:** Mặt Trăng\n✨ **Tính cách:** Nhạy cảm, chăm sóc, gia đình\n💪 **Điểm mạnh:** Trực giác, bảo vệ, trung thành\n⚠️ **Điểm yếu:** Nhạy cảm quá mức\n💼 **Sự nghiệp:** Y tế, giáo dục\n💕 **Tình yêu:** Tận tâm, gia đình là trên hết\n💫 Cancer được cai quản bởi Mặt Trăng.\n\nBạn có muốn biết thêm về cung nào khác?",
    "leo": "🌟 **Leo (Sư Tử)** ♌\n\n📅 **Ngày sinh:** 23/7 - 22/8\n🔥 **Nguyên tố:** Lửa\n🪐 **Hành tinh:** Mặt Trời\n✨ **Tính cách:** Tự tin, hào phóng, lãnh đạo\n💪 **Điểm mạnh:** Tự tin, sáng tạo, lạc quan\n⚠️ **Điểm yếu:** Kiêu ngạo, độc đoán\n💼 **Sự nghiệp:** Sáng tạo, giải trí, quản lý\n💕 **Tình yêu:** Cần được ngưỡng mộ\n💫 Leo được cai quản bởi Mặt Trời.\n\nBạn có muốn biết thêm về cung nào khác?",
    "virgo": "🌟 **Virgo (Xử Nữ)** ♍\n\n📅 **Ngày sinh:** 23/8 - 22/9\n🔥 **Nguyên tố:** Đất\n🪐 **Hành tinh:** Sao Thủy\n✨ **Tính cách:** Cầu toàn, chi tiết, phân tích\n💪 **Điểm mạnh:** Chăm chỉ, đáng tin cậy\n⚠️ **Điểm yếu:** Hay phê phán, lo âu\n💼 **Sự nghiệp:** Y tế, kế toán, nghiên cứu\n💕 **Tình yêu:** Thể hiện qua hành động\n💫 Virgo là cung của sự hoàn thiện.\n\nBạn có muốn biết thêm về cung nào khác?",
    "libra": "🌟 **Libra (Thiên Xứng)** ♎\n\n📅 **Ngày sinh:** 23/9 - 22/10\n🔥 **Nguyên tố:** Không khí\n🪐 **Hành tinh:** Sao Kim\n✨ **Tính cách:** Cân bằng, công bằng, hòa nhã\n💪 **Điểm mạnh:** Ngoại giao, công bằng\n⚠️ **Điểm yếu:** Hay do dự\n💼 **Sự nghiệp:** Nghệ thuật, luật, ngoại giao\n💕 **Tình yêu:** Tìm kiếm sự hài hòa\n💫 Libra tượng trưng cho sự cân bằng.\n\nBạn có muốn biết thêm về cung nào khác?",
    "scorpio": "🌟 **Scorpio (Bò Cạp)** ♏\n\n📅 **Ngày sinh:** 23/10 - 21/11\n🔥 **Nguyên tố:** Nước\n🪐 **Hành tinh:** Sao Diêm Vương\n✨ **Tính cách:** Kiên cường, đam mê, bí ẩn\n💪 **Điểm mạnh:** Trực giác, kiên cường\n⚠️ **Điểm yếu:** Ghen tuông, báo thù\n💼 **Sự nghiệp:** Nghiên cứu, tâm lý, tài chính\n💕 **Tình yêu:** Sâu sắc, mãnh liệt\n💫 Scorpio là cung của sự biến đổi.\n\nBạn có muốn biết thêm về cung nào khác?",
    "sagittarius": "🌟 **Sagittarius (Nhân Mã)** ♐\n\n📅 **Ngày sinh:** 22/11 - 21/12\n🔥 **Nguyên tố:** Lửa\n🪐 **Hành tinh:** Sao Mộc\n✨ **Tính cách:** Lạc quan, phiêu lưu, thẳng thắn\n💪 **Điểm mạnh:** Lạc quan, trung thực\n⚠️ **Điểm yếu:** Thiếu kiên nhẫn\n💼 **Sự nghiệp:** Du lịch, giáo dục, xuất bản\n💕 **Tình yêu:** Cần tự do\n💫 Sagittarius được cai quản bởi Sao Mộc.\n\nBạn có muốn biết thêm về cung nào khác?",
    "capricorn": "🌟 **Capricorn (Ma Kết)** ♑\n\n📅 **Ngày sinh:** 22/12 - 19/1\n🔥 **Nguyên tố:** Đất\n🪐 **Hành tinh:** Sao Thổ\n✨ **Tính cách:** Kỷ luật, tham vọng, kiên nhẫn\n💪 **Điểm mạnh:** Kỷ luật, trách nhiệm\n⚠️ **Điểm yếu:** Bi quan, bảo thủ\n💼 **Sự nghiệp:** Quản lý, tài chính, luật\n💕 **Tình yêu:** Nghiêm túc\n💫 Capricorn được cai quản bởi Sao Thổ.\n\nBạn có muốn biết thêm về cung nào khác?",
    "aquarius": "🌟 **Aquarius (Bảo Bình)** ♒\n\n📅 **Ngày sinh:** 20/1 - 18/2\n🔥 **Nguyên tố:** Không khí\n🪐 **Hành tinh:** Sao Thiên Vương\n✨ **Tính cách:** Độc lập, sáng tạo, nhân đạo\n💪 **Điểm mạnh:** Sáng tạo, tiến bộ\n⚠️ **Điểm yếu:** Bất đồng\n💼 **Sự nghiệp:** Công nghệ, khoa học\n💕 **Tình yêu:** Cần độc lập\n💫 Aquarius là cung của sự đổi mới.\n\nBạn có muốn biết thêm về cung nào khác?",
    "pisces": "🌟 **Pisces (Song Ngư)** ♓\n\n📅 **Ngày sinh:** 19/2 - 20/3\n🔥 **Nguyên tố:** Nước\n🪐 **Hành tinh:** Sao Hải Vương\n✨ **Tính cách:** Nhạy cảm, nghệ thuật, mơ mộng\n💪 **Điểm mạnh:** Trực giác, từ bi\n⚠️ **Điểm yếu:** Trốn tránh thực tế\n💼 **Sự nghiệp:** Nghệ thuật, âm nhạc, tâm lý\n💕 **Tình yêu:** Lãng mạn\n💫 Pisces là cung cuối cùng.\n\nBạn có muốn biết thêm về cung nào khác?",
  };

  // Detailed fallback responses - English
  const fallbackResponsesEn: Record<string, string> = {
    "aries": "🌟 **Aries (The Ram)** ♈\n\n📅 **Dates:** March 21 - April 19\n🔥 **Element:** Fire\n🪐 **Ruling Planet:** Mars\n✨ **Personality:** Energetic, courageous, passionate\n💪 **Strengths:** Brave, confident, honest\n⚠️ **Weaknesses:** Impatient, aggressive\n💼 **Career:** Business, sports, leadership\n💕 **Love:** Passionate, gives all\n💫 Aries is the first sign, symbolizing new beginnings.\n\nWould you like to learn more about another sign?",
    "taurus": "🌟 **Taurus (The Bull)** ♉\n\n📅 **Dates:** April 20 - May 20\n🔥 **Element:** Earth\n🪐 **Ruling Planet:** Venus\n✨ **Personality:** Patient, reliable, practical\n💪 **Strengths:** Reliable, hardworking, loyal\n⚠️ **Weaknesses:** Stubborn, possessive\n💼 **Career:** Finance, real estate, art\n💕 **Love:** Loyal, needs security\n💫 Taurus symbolizes stability.\n\nWould you like to learn more about another sign?",
    "gemini": "🌟 **Gemini (The Twins)** ♊\n\n📅 **Dates:** May 21 - June 20\n🔥 **Element:** Air\n🪐 **Ruling Planet:** Mercury\n✨ **Personality:** Adaptable, curious, communicative\n💪 **Strengths:** Intelligent, flexible\n⚠️ **Weaknesses:** Anxious, impatient\n💼 **Career:** Media, journalism, education\n💕 **Love:** Needs intellectual stimulation\n💫 Gemini is ruled by Mercury.\n\nWould you like to learn more about another sign?",
    "cancer": "🌟 **Cancer (The Crab)** ♋\n\n📅 **Dates:** June 21 - July 22\n🔥 **Element:** Water\n🪐 **Ruling Planet:** Moon\n✨ **Personality:** Sensitive, caring, family-oriented\n💪 **Strengths:** Intuitive, protective, loyal\n⚠️ **Weaknesses:** Oversensitive\n💼 **Career:** Healthcare, education\n💕 **Love:** Devoted, family first\n💫 Cancer is ruled by the Moon.\n\nWould you like to learn more about another sign?",
    "leo": "🌟 **Leo (The Lion)** ♌\n\n📅 **Dates:** July 23 - August 22\n🔥 **Element:** Fire\n🪐 **Ruling Planet:** Sun\n✨ **Personality:** Confident, generous, leader\n💪 **Strengths:** Confident, creative, optimistic\n⚠️ **Weaknesses:** Proud, dominant\n💼 **Career:** Creative, entertainment, management\n💕 **Love:** Needs to be adored\n💫 Leo is ruled by the Sun.\n\nWould you like to learn more about another sign?",
    "virgo": "🌟 **Virgo (The Virgin)** ♍\n\n📅 **Dates:** August 23 - September 22\n🔥 **Element:** Earth\n🪐 **Ruling Planet:** Mercury\n✨ **Personality:** Perfectionist, detail-oriented, analytical\n💪 **Strengths:** Hardworking, reliable\n⚠️ **Weaknesses:** Critical, anxious\n💼 **Career:** Healthcare, accounting, research\n💕 **Love:** Shows love through actions\n💫 Virgo is the sign of perfection.\n\nWould you like to learn more about another sign?",
    "libra": "🌟 **Libra (The Scales)** ♎\n\n📅 **Dates:** September 23 - October 22\n🔥 **Element:** Air\n🪐 **Ruling Planet:** Venus\n✨ **Personality:** Balanced, fair, diplomatic\n💪 **Strengths:** Diplomatic, fair\n⚠️ **Weaknesses:** Indecisive\n💼 **Career:** Art, law, diplomacy\n💕 **Love:** Seeks harmony\n💫 Libra symbolizes balance.\n\nWould you like to learn more about another sign?",
    "scorpio": "🌟 **Scorpio (The Scorpion)** ♏\n\n📅 **Dates:** October 23 - November 21\n🔥 **Element:** Water\n🪐 **Ruling Planet:** Pluto\n✨ **Personality:** Strong-willed, passionate, mysterious\n💪 **Strengths:** Intuitive, courageous\n⚠️ **Weaknesses:** Jealous, revengeful\n💼 **Career:** Research, psychology, finance\n💕 **Love:** Deep and intense\n💫 Scorpio is the sign of transformation.\n\nWould you like to learn more about another sign?",
    "sagittarius": "🌟 **Sagittarius (The Archer)** ♐\n\n📅 **Dates:** November 22 - December 21\n🔥 **Element:** Fire\n🪐 **Ruling Planet:** Jupiter\n✨ **Personality:** Optimistic, adventurous, honest\n💪 **Strengths:** Optimistic, honest\n⚠️ **Weaknesses:** Impatient\n💼 **Career:** Travel, education, publishing\n💕 **Love:** Needs freedom\n💫 Sagittarius is ruled by Jupiter.\n\nWould you like to learn more about another sign?",
    "capricorn": "🌟 **Capricorn (The Goat)** ♑\n\n📅 **Dates:** December 22 - January 19\n🔥 **Element:** Earth\n🪐 **Ruling Planet:** Saturn\n✨ **Personality:** Disciplined, ambitious, patient\n💪 **Strengths:** Disciplined, responsible\n⚠️ **Weaknesses:** Pessimistic, conservative\n💼 **Career:** Management, finance, law\n💕 **Love:** Serious\n💫 Capricorn is ruled by Saturn.\n\nWould you like to learn more about another sign?",
    "aquarius": "🌟 **Aquarius (The Water Bearer)** ♒\n\n📅 **Dates:** January 20 - February 18\n🔥 **Element:** Air\n🪐 **Ruling Planet:** Uranus\n✨ **Personality:** Independent, creative, humanitarian\n💪 **Strengths:** Creative, progressive\n⚠️ **Weaknesses:** Rebellious\n💼 **Career:** Technology, science\n💕 **Love:** Needs independence\n💫 Aquarius is the sign of innovation.\n\nWould you like to learn more about another sign?",
    "pisces": "🌟 **Pisces (The Fish)** ♓\n\n📅 **Dates:** February 19 - March 20\n🔥 **Element:** Water\n🪐 **Ruling Planet:** Neptune\n✨ **Personality:** Sensitive, artistic, dreamy\n💪 **Strengths:** Intuitive, compassionate\n⚠️ **Weaknesses:** Escapist\n💼 **Career:** Art, music, psychology\n💕 **Love:** Romantic\n💫 Pisces is the last sign.\n\nWould you like to learn more about another sign?",
  };

  const getResponse = useCallback((message: string, lang: ChatLanguage): string => {
    const isVi = lang === 'vi';
    const fallbackResponses = isVi ? fallbackResponsesVi : fallbackResponsesEn;
    const lowerMessage = message.toLowerCase();
    
    // Check for zodiac signs
    for (const [sign, response] of Object.entries(fallbackResponses)) {
      if (lowerMessage.includes(sign)) {
        return response;
      }
    }
    
    // Check for greetings
    if (lowerMessage.includes("xin chào") || lowerMessage.includes("chào") || 
        lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return isVi ? defaultWelcomeVi : defaultWelcomeEn;
    }
    
    // Check for birthday
    if (lowerMessage.includes("ngày sinh") || lowerMessage.includes("sinh ngày") ||
        lowerMessage.includes("birthday") || lowerMessage.includes("dates")) {
      if (isVi) {
        return "📅 **Ngày sinh của các cung:**\n\n• Aries: 21/3 - 19/4\n• Taurus: 20/4 - 20/5\n• Gemini: 21/5 - 20/6\n• Cancer: 21/6 - 22/7\n• Leo: 23/7 - 22/8\n• Virgo: 23/8 - 22/9\n• Libra: 23/9 - 22/10\n• Scorpio: 23/10 - 21/11\n• Sagittarius: 22/11 - 21/12\n• Capricorn: 22/12 - 19/1\n• Aquarius: 20/1 - 18/2\n• Pisces: 19/2 - 20/3\n\nBạn thuộc cung nào?";
      } else {
        return "📅 **Birth dates of zodiac signs:**\n\n• Aries: March 21 - April 19\n• Taurus: April 20 - May 20\n• Gemini: May 21 - June 20\n• Cancer: June 21 - July 22\n• Leo: July 23 - August 22\n• Virgo: August 23 - September 22\n• Libra: September 23 - October 22\n• Scorpio: October 23 - November 21\n• Sagittarius: November 22 - December 21\n• Capricorn: December 22 - January 19\n• Aquarius: January 20 - February 18\n• Pisces: February 19 - March 20\n\nWhich sign are you?";
      }
    }
    
    // Check for elements
    if (lowerMessage.includes("nguyên tố") || lowerMessage.includes("element")) {
      if (isVi) {
        return "🔥🌊🌬️🌍 **Nguyên tố:**\n\n🔥 **LỬA:** Aries, Leo, Sagittarius\n🌍 **ĐẤT:** Taurus, Virgo, Capricorn\n💨 **KHÔNG KHÍ:** Gemini, Libra, Aquarius\n💧 **NƯỚC:** Cancer, Scorpio, Pisces\n\nBạn thuộc cung nguyên tố nào?";
      } else {
        return "🔥🌊🌬️🌍 **Elements:**\n\n🔥 **FIRE:** Aries, Leo, Sagittarius\n🌍 **EARTH:** Taurus, Virgo, Capricorn\n💨 **AIR:** Gemini, Libra, Aquarius\n💧 **WATER:** Cancer, Scorpio, Pisces\n\nWhich element interests you?";
      }
    }

    // Check for love
    if (lowerMessage.includes("tình yêu") || lowerMessage.includes("love") || lowerMessage.includes("romance")) {
      if (isVi) {
        return "💕 **Tình yêu:**\n\n• Aries: Nồng nhiệt\n• Taurus: Chung thủy\n• Gemini: Cần kích thích\n• Cancer: Gia đình\n• Leo: Cần được ngưỡng mộ\n• Virgo: Qua hành động\n• Libra: Tìm hài hòa\n• Scorpio: Mãnh liệt\n• Sagittarius: Cần tự do\n• Capricorn: Nghiêm túc\n• Aquarius: Cần độc lập\n• Pisces: Lãng mạn\n\n\nBạn muốn biết về cung nào?";
      } else {
        return "💕 **Love:**\n\n• Aries: Passionate\n• Taurus: Loyal\n• Gemini: Needs stimulation\n• Cancer: Family first\n• Leo: Needs admiration\n• Virgo: Through actions\n• Libra: Seeks harmony\n• Scorpio: Intense\n• Sagittarius: Needs freedom\n• Capricorn: Serious\n• Aquarius: Needs independence\n• Pisces: Romantic\n\nWhich sign interests you?";
      }
    }
    
    return isVi ? defaultHelpVi : defaultHelpEn;
  }, []);

  const getWelcomeMessage = useCallback((lang: ChatLanguage): string => {
    return lang === 'vi' ? defaultWelcomeVi : defaultWelcomeEn;
  }, []);

  const getHelpMessage = useCallback((lang: ChatLanguage): string => {
    return lang === 'vi' ? defaultHelpVi : defaultHelpEn;
  }, []);

  const getQuickReplies = useCallback((lang: ChatLanguage): string[] => {
    return lang === 'vi' ? quickRepliesVi : quickRepliesEn;
  }, []);

  return {
    getResponse,
    getWelcomeMessage,
    getHelpMessage,
    getQuickReplies,
  };
}

// Language detection utility
export const detectLanguage = (message: string): ChatLanguage => {
  const lowerMessage = message.toLowerCase();
  const englishWords = ['what', 'how', 'who', 'when', 'where', 'tell', 'about', 
    'is', 'are', 'the', 'and', 'love', 'career', 'personality', 'hello', 'hi', 'hey',
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 
    'sagittarius', 'capricorn', 'aquarius', 'pisces', 'birthday', 'element', 'trait'];
  
  const vietnameseWords = ['là', 'gì', 'của', 'như', 'thế', 'nào', 'có', 'muốn', 
    'biết', 'tìm', 'hiểu', 'xin', 'chào', 'tính', 'cách', 'ngày', 'sinh',
    'tình', 'yêu', 'sự', 'nghiệp', 'cung', 'hoàng', 'đạo'];
  
  let englishCount = 0;
  let vietnameseCount = 0;
  
  for (const word of englishWords) {
    if (lowerMessage.includes(word)) englishCount++;
  }
  for (const word of vietnameseWords) {
    if (lowerMessage.includes(word)) vietnameseCount++;
  }
  
  return englishCount > vietnameseCount ? 'en' : 'vi';
};

