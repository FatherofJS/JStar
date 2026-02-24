from flask import Flask, jsonify, request
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
from src.routes.location import location_bp
app.register_blueprint(location_bp, url_prefix='/api/location')

@app.route('/api/health')
def health_check():
    return jsonify({'status': 'ok', 'message': 'JStar API is running'})

# Landing page features endpoint - Multi-language
@app.route('/api/features', methods=['GET'])
def get_features():
    language = request.args.get('lang', 'en')
    
    # Feature data in all languages
    features_data = {
        "en": [
            {
                "id": "features",
                "badge": "Interactive Charts",
                "badgeIcon": "chart",
                "title": "Beautiful, Precise Astrology Charts",
                "description": "High-precision SVG charts with interactive hover states, customizable themes, and detailed planetary positions. Every chart is calculated with astronomical accuracy.",
                "items": [
                    "Natal, Transits, Synastry, Composite charts",
                    "Solar and Lunar Return charts",
                    "Multiple house systems (Placidus, Whole Sign, Koch...)",
                    "Tropical and Sidereal zodiac options",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/birth-chart.webp",
                "imageAlt": "Astrologer Studio Dashboard - Natal Chart",
                "reversed": False,
                "glowColor": "blue",
            },
            {
                "id": "chart-data",
                "badge": "Chart Data",
                "badgeIcon": "chart",
                "title": "Complete Chart Analysis",
                "description": "Every chart includes a comprehensive Data tab with all the details you need. Planetary positions, house placements, aspects, and element distributions at your fingertips.",
                "items": [
                    "Chart highlights with key placements",
                    "Lunar phase and aspect details",
                    "Element and quality distribution charts",
                    "Complete planetary positions table",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/data.webp",
                "imageAlt": "Chart Data Tab - Detailed planetary positions",
                "reversed": True,
                "glowColor": "blue",
            },
            {
                "id": "transit-analysis",
                "badge": "Transit Analysis",
                "badgeIcon": "chart",
                "title": "Real-Time Planetary Transits",
                "description": "Overlay current planetary positions on any natal chart. Track how transiting planets interact with natal placements to understand timing and influences.",
                "items": [
                    "Dual-ring chart with natal and transit positions",
                    "Aspect lines between transit and natal planets",
                    "Customizable transit date selection",
                    "Instant aspect calculations",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/transit-chart.webp",
                "imageAlt": "Transit Chart - Current planetary transits",
                "reversed": False,
                "glowColor": "purple",
            },
            {
                "id": "aspect-grid",
                "badge": "Aspect Grid",
                "badgeIcon": "chart",
                "title": "Complete Aspect Overview",
                "description": "View all planetary aspects at a glance with our interactive aspect grid. Quickly identify harmonious and challenging configurations in any chart comparison.",
                "items": [
                    "Color-coded aspect types (conjunction, trine, square...)",
                    "Orb values displayed for each aspect",
                    "Filter by aspect type or planet",
                    "Works with natal, transit, and synastry charts",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/transit-grid.webp",
                "imageAlt": "Transit Grid - Detailed aspect grid",
                "reversed": True,
                "glowColor": "blue",
            },
            {
                "id": "transit-timeline",
                "badge": "Transit Timeline",
                "badgeIcon": "chart",
                "title": "Track Upcoming Transits",
                "description": "See exactly when transits will be exact with the timeline view. Plan ahead with precise dates for applying and separating aspects.",
                "items": [
                    "Chronological list of transit events",
                    "Exact dates and times for aspect perfection",
                    "Filter by planet, aspect type, or date range",
                    "Retrograde and direct station markers",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/timeline.webp",
                "imageAlt": "Timeline - Transit events and exact aspect dates",
                "reversed": False,
                "glowColor": "purple",
            },
            {
                "id": "ephemeris",
                "badge": "Ephemeris & Tables",
                "badgeIcon": "chart",
                "title": "Visual Planetary Ephemeris",
                "description": "Explore planetary positions with both graphical and tabular views. Track planetary movements across the zodiac over any time period.",
                "items": [
                    "Graphical ephemeris chart with planetary tracks",
                    "Detailed position tables by date",
                    "Retrograde periods clearly highlighted",
                    "Export data for research and reference",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/ephemeris-chart.webp",
                "imageAlt": "Graphical Ephemeris - Visual planetary position chart",
                "reversed": True,
                "glowColor": "blue",
            },
            {
                "id": "position-tables",
                "badge": "Position Tables",
                "badgeIcon": "chart",
                "title": "Detailed Position Data",
                "description": "Access precise planetary positions for any date range. Perfect for research, mundane astrology, and verifying chart calculations.",
                "items": [
                    "Daily positions for all planets",
                    "Degree, minutes, and seconds precision",
                    "Moon phases and void-of-course times",
                    "Ingress dates and sign changes",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/ephemeris-list.webp",
                "imageAlt": "Ephemeris Table - Daily planetary positions",
                "reversed": False,
                "glowColor": "blue",
            },
            {
                "id": "data-management",
                "badge": "Data Management",
                "badgeIcon": "chart",
                "title": "Organize Your Client Database",
                "description": "Store unlimited profiles with complete birth data, notes, and tags. Quick access to any client's charts and readings in seconds.",
                "items": [
                    "Complete birth data with location lookup",
                    "Rodden rating for data accuracy",
                    "Tags and notes for organization",
                    "Quick search and filter",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/data.webp",
                "imageAlt": "Data Management - Subject database",
                "reversed": True,
                "glowColor": "purple",
            },
            {
                "id": "ai-interpretations",
                "badge": "AI Interpretations",
                "badgeIcon": "sparkles",
                "title": "Instant Insights, Powered by AI",
                "description": "Get intelligent, context-aware interpretations for any chart. Rich formatted text with emojis, headings, and structured analysis delivered in real-time.",
                "items": [
                    "Full chart analysis with key themes",
                    "Structured sections with headings",
                    "Real-time streaming text generation",
                    "Works with all chart types",
                ],
                "imageSrc": "",
                "imageAlt": "AI Interpretation",
                "reversed": False,
                "glowColor": "blue",
            },
        ],
        "vi": [
            {
                "id": "features",
                "badge": "Biểu đồ Tương tác",
                "badgeIcon": "chart",
                "title": "Biểu đồ Chiêm tinh Đẹp, Chính xác",
                "description": "Biểu đồ SVG độ chính xác cao với trạng thái di chuột tương tác, chủ đề tùy chỉnh và vị trí hành tinh chi tiết. Mỗi biểu đồ được tính toán với độ chính xác thiên văn.",
                "items": [
                    "Bản đồ sinh, Sao chuyển, Synastry, Hợp nhất",
                    "Bản đồ Mặt trời và Mặt trăng trả về",
                    "Nhiều hệ thống nhà (Placidus, Whole Sign, Koch...)",
                    "Tùy chọn hoàng đạo Nhiệt đới và Nghiệm lý",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/birth-chart.webp",
                "imageAlt": "Astrologer Studio Dashboard - Natal Chart",
                "reversed": False,
                "glowColor": "blue",
            },
            {
                "id": "chart-data",
                "badge": "Dữ liệu Biểu đồ",
                "badgeIcon": "chart",
                "title": "Phân tích Biểu đồ Hoàn chỉnh",
                "description": "Mỗi biểu đồ bao gồm tab Dữ liệu toàn diện với tất cả thông tin bạn cần. Vị trí hành tinh, vị trí nhà, khía cạnh và phân bố nguyên tố trong tầm tay.",
                "items": [
                    "Điểm nổi bật của biểu đồ với các vị trí chính",
                    "Chi tiết pha Mặt trăng và khía cạnh",
                    "Biểu đồ phân bố nguyên tố và chất lượng",
                    "Bảng vị trí hành tinh hoàn chỉnh",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/data.webp",
                "imageAlt": "Chart Data Tab - Detailed planetary positions",
                "reversed": True,
                "glowColor": "blue",
            },
            {
                "id": "transit-analysis",
                "badge": "Phân tích Sao chuyển",
                "badgeIcon": "chart",
                "title": "Sao chuyển Hành tinh Thời gian thực",
                "description": "Phủ vị trí hành tinh hiện tại lên bất kỳ biểu đồ sinh nào. Theo dõi cách các hành tinh chuyển động tương tác với vị trí sinh để hiểu thời điểm và ảnh hưởng.",
                "items": [
                    "Biểu đồ hai vòng với vị trí sinh và chuyển động",
                    "Đường khía cạnh giữa hành tinh chuyển và sinh",
                    "Tùy chọn ngày chuyển động tùy chỉnh",
                    "Tính toán khía cạnh tức thì",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/transit-chart.webp",
                "imageAlt": "Transit Chart - Current planetary transits",
                "reversed": False,
                "glowColor": "purple",
            },
            {
                "id": "aspect-grid",
                "badge": "Lưới Khía cạnh",
                "badgeIcon": "chart",
                "title": "Tổng quan Khía cạnh Hoàn chỉnh",
                "description": "Xem tất cả các khía cạnh hành tinh cùng lúc với lưới khía cạnh tương tác của chúng tôi. Nhanh chóng xác định các cấu hình hài hòa và thách thức trong bất kỳ so sánh biểu đồ nào.",
                "items": [
                    "Các loại khía cạnh được mã hóa màu (hội tụ, tam hợp, vuông góc...)",
                    "Giá trị orb hiển thị cho mỗi khía cạnh",
                    "Lọc theo loại khía cạnh hoặc hành tinh",
                    "Hoạt động với biểu đồ sinh, chuyển và synastry",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/transit-grid.webp",
                "imageAlt": "Transit Grid - Detailed aspect grid",
                "reversed": True,
                "glowColor": "blue",
            },
            {
                "id": "transit-timeline",
                "badge": "Dòng thời gian Sao chuyển",
                "badgeIcon": "chart",
                "title": "Theo dõi Sao chuyển Sắp tới",
                "description": "Xem chính xác khi nào sao chuyển sẽ chính xác với chế độ xem dòng thời gian. Lập kế hoạch trước với ngày chính xác cho các khía cạnh áp dụng và tách.",
                "items": [
                    "Danh sách sự kiện sao chuyển theo thứ tự thời gian",
                    "Ngày và giờ chính xác cho sự hoàn hảo của khía cạnh",
                    "Lọc theo hành tinh, loại khía cạnh hoặc phạm vi ngày",
                    "Đánh dấu điểm nghịch thuật và thuận",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/timeline.webp",
                "imageAlt": "Timeline - Transit events and exact aspect dates",
                "reversed": False,
                "glowColor": "purple",
            },
            {
                "id": "ephemeris",
                "badge": "Ephemeris & Bảng",
                "badgeIcon": "chart",
                "title": "Ephemeris Hành tinh Trực quan",
                "description": "Khám phá vị trí hành tinh với cả chế độ xem đồ họa và bảng. Theo dõi chuyển động hành tinh qua hoàng đạo trong bất kỳ khoảng thời gian nào.",
                "items": [
                    "Biểu đồ ephemeris đồ họa với quỹ đạo hành tinh",
                    "Bảng vị trí chi tiết theo ngày",
                    "Giai đoạn nghịch thuật được đánh dấu rõ ràng",
                    "Xuất dữ liệu để nghiên cứu và tham khảo",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/ephemeris-chart.webp",
                "imageAlt": "Graphical Ephemeris - Visual planetary position chart",
                "reversed": True,
                "glowColor": "blue",
            },
            {
                "id": "position-tables",
                "badge": "Bảng Vị trí",
                "badgeIcon": "chart",
                "title": "Dữ liệu Vị trí Chi tiết",
                "description": "Truy cập vị trí hành tinh chính xác cho bất kỳ phạm vi ngày nào. Hoàn hảo cho nghiên cứu, chiêm tinh đại chúng và xác minh tính toán biểu đồ.",
                "items": [
                    "Vị trí hàng ngày cho tất cả hành tinh",
                    "Độ, phút và giây chính xác",
                    "Pha Mặt trăng và thời điểm void-of-course",
                    "Ngày nhập và thay đổi cung",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/ephemeris-list.webp",
                "imageAlt": "Ephemeris Table - Daily planetary positions",
                "reversed": False,
                "glowColor": "blue",
            },
            {
                "id": "data-management",
                "badge": "Quản lý Dữ liệu",
                "badgeIcon": "chart",
                "title": "Tổ chức Cơ sở dữ liệu Khách hàng",
                "description": "Lưu trữ hồ sơ không giới hạn với dữ liệu sinh đầy đủ, ghi chú và thẻ. Truy cập nhanh vào biểu đồ và lời giải của bất kỳ khách hàng nào trong vài giây.",
                "items": [
                    "Dữ liệu sinh đầy đủ với tra cứu địa điểm",
                    "Xếp hạng Rodden cho độ chính xác dữ liệu",
                    "Thẻ và ghi chú để tổ chức",
                    "Tìm kiếm và lọc nhanh",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/data.webp",
                "imageAlt": "Data Management - Subject database",
                "reversed": True,
                "glowColor": "purple",
            },
            {
                "id": "ai-interpretations",
                "badge": "Diễn giải AI",
                "badgeIcon": "sparkles",
                "title": "Thông tin tức thì, Công nghệ AI",
                "description": "Nhận diễn giải thông minh, nhận biết ngữ cảnh cho bất kỳ biểu đồ nào. Văn bản được định dạng phong phú với emoji, tiêu đề và phân tích cấu trúc được cung cấp theo thời gian thực.",
                "items": [
                    "Phân tích biểu đồ đầy đủ với các chủ đề chính",
                    "Các phần được cấu trúc với tiêu đề",
                    "Tạo văn bản streaming thời gian thực",
                    "Hoạt động với tất cả các loại biểu đồ",
                ],
                "imageSrc": "",
                "imageAlt": "AI Interpretation",
                "reversed": False,
                "glowColor": "blue",
            },
        ],
        "ja": [
            {
                "id": "features",
                "badge": "インタラクティブチャート",
                "badgeIcon": "chart",
                "title": "美丽で正確な占星術チャート",
                "description": "インタラクティブなホバー状態、カスタマイズ可能なテーマ、詳細な惑星位置を備えた高精度SVGチャート。すべてのチャートは天文学的な精度で計算されています。",
                "items": [
                    "natal, トランジット, シンアストリー, コンポジットチャート",
                    "太陽・月帰還チャート",
                    "複数のハウスシステム（プラキディウス、ホールサイン、コッホ...）",
                    "热带・sidereal占星術オプション",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/birth-chart.webp",
                "imageAlt": "Astrologer Studio Dashboard - Natal Chart",
                "reversed": False,
                "glowColor": "blue",
            },
            {
                "id": "chart-data",
                "badge": "チャートデータ",
                "badgeIcon": "chart",
                "title": "完全なチャート分析",
                "description": "各チャートには、必要なすべての詳細を備えた包括的なデータタブが含まれています。惑星位置、ハウス配置、アスペクト、元素分布を手の届き处に。",
                "items": [
                    "重要な配置を持つチャートのハイライト",
                    "月相とアスペクトの詳細",
                    "元素と каче分布チャート",
                    "完全な惑星位置テーブル",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/data.webp",
                "imageAlt": "Chart Data Tab - Detailed planetary positions",
                "reversed": True,
                "glowColor": "blue",
            },
            {
                "id": "transit-analysis",
                "badge": "トランジット分析",
                "badgeIcon": "chart",
                "title": "リアルタイム惑星トランジット",
                "description": " natalチャートに現在の惑星位置をオーバーレイ。通過する惑星が natal 配置とどのように相互作用するかを追跡して、タイミングと影響を理解します。",
                "items": [
                    " natalとトランジット位置を持つDual-ringチャート",
                    "トランジットと natal惑星間のアスペクトライン",
                    "カスタマイズ可能なトランジット日選択",
                    "インスタントアスペクト計算",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/transit-chart.webp",
                "imageAlt": "Transit Chart - Current planetary transits",
                "reversed": False,
                "glowColor": "purple",
            },
            {
                "id": "aspect-grid",
                "badge": "アスペクトグリッド",
                "badgeIcon": "chart",
                "title": "完全なアスペクト概要",
                "description": "インタラクティブなアスペクトグリッドで、すべての惑星アспек트를一目で表示。任意のチャート比較で調和的かつ挑戦的な構成を素早く特定。",
                "items": [
                    "カラーコード化されたアスペクトタイプ（コンジャンクション、トライン、スケア...）",
                    "各アスペクトに表示されるオーブ値",
                    "アスペクトタイプまたは惑星でフィルタ",
                    " natal, トランジット, シンアストリーチャートで動作",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/transit-grid.webp",
                "imageAlt": "Transit Grid - Detailed aspect grid",
                "reversed": True,
                "glowColor": "blue",
            },
            {
                "id": "transit-timeline",
                "badge": "トランジットタイムライン",
                "badgeIcon": "chart",
                "title": "今後のトランジットを追跡",
                "description": "タイムラインビューでトランジットが正確になるときを正確に確認。適用および分離アspectの正確な日付で事前に計画。",
                "items": [
                    "トランジットイベントの年代順リスト",
                    "アスペクト完成の正確な日時",
                    "惑星、アスペクトタイプ、日付範囲でフィルタ",
                    "逆行と直接ステーションのマーカー",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/timeline.webp",
                "imageAlt": "Timeline - Transit events and exact aspect dates",
                "reversed": False,
                "glowColor": "purple",
            },
            {
                "id": "ephemeris",
                "badge": "エフェメリス＆テーブル",
                "badgeIcon": "chart",
                "title": "ビジュアル惑星エフェメリス",
                "description": "グラフィカルおよびテーブルビューで惑星位置を探索。任意の期間にわたって黄道帯全体の惑星移動を追跡。",
                "items": [
                    "惑星軌道を持つグラフィカルエフェメリスチャート",
                    "日付別詳細位置テーブル",
                    "逆行期間が明確にハイライト",
                    "研究と参照のためのデータエクスポート",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/ephemeris-chart.webp",
                "imageAlt": "Graphical Ephemeris - Visual planetary position chart",
                "reversed": True,
                "glowColor": "blue",
            },
            {
                "id": "position-tables",
                "badge": "位置テーブル",
                "badgeIcon": "chart",
                "title": "詳細な位置データ",
                "description": "任意の日付範囲の正確な惑星位置にアクセス。研究、mundane占星術、チャート計算の検証に最適。",
                "items": [
                    "すべての惑星の日次位置",
                    "度、分、秒の精度",
                    "月相とボイド・オブ・コーズの時間",
                    "イングレス日付とサイン変更",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/ephemeris-list.webp",
                "imageAlt": "Ephemeris Table - Daily planetary positions",
                "reversed": False,
                "glowColor": "blue",
            },
            {
                "id": "data-management",
                "badge": "データ管理",
                "badgeIcon": "chart",
                "title": "クライアントデータベースを整理",
                "description": "完全な出生データ、メモ、タグを持つ無制限のプロフィールを保存。 数秒で任意のクライアントのチャートとリーディングにクイックアクセス。",
                "items": [
                    "場所検索を含む完全な出生データ",
                    "データ精度のためのロッデン評価",
                    "整理のためのタグとメモ",
                    "クイック検索とフィルタ",
                ],
                "imageSrc": "https://cdn.statically.io/gh/g-battaglia/AstrologerStudio@main/CDN/screenshots/data.webp",
                "imageAlt": "Data Management - Subject database",
                "reversed": True,
                "glowColor": "purple",
            },
            {
                "id": "ai-interpretations",
                "badge": "AI解釈",
                "badgeIcon": "sparkles",
                "title": "AIパワードインサイト",
                "description": "任意のチャートにIntelligent、コンテキスト認識の解釈を取得。絵文字、見出し、構造化された分析を備えたリッチなフォーマットテキストがリアルタイムで提供。",
                "items": [
                    "主要なテーマを持つ完全なチャート分析",
                    "見出しを持つ構造化されたセクション",
                    "リアルタイムストリーミングテキスト生成",
                    "すべてのチャートタイプで動作",
                ],
                "imageSrc": "",
                "imageAlt": "AI Interpretation",
                "reversed": False,
                "glowColor": "blue",
            },
        ],
    }
    
    # Return features for requested language, default to English
    features = features_data.get(language, features_data["en"])
    return jsonify({'features': features})

# Chatbot endpoint for zodiac questions - Multi-language version
@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    user_message = data.get('message', '').lower()
    
    # Detect language
    is_english = any(word in user_message for word in [
        "what", "how", "who", "when", "where", "tell", "about", 
        "is", "are", "the", "and", "love", "career", "personality",
        "aries", "taurus", "gemini", "cancer", "leo", "virgo",
        "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
        "hello", "hi", "hey"
    ])
    
    # Detailed zodiac information database - Vietnamese
    zodiac_info_vi = {
        "aries": {
            "name": "Aries (Bạch Dương)",
            "symbol": "♈",
            "dates": "21/3 - 19/4",
            "element": "Lửa",
            "planet": "Sao Hỏa",
            "traits": "Năng động, can đảm, nhiệt huyết, lạc quan, kiên cường, quyết đoán",
            "strengths": "Dũng cảm, nhiệt tình, tự tin, trung thực",
            "weaknesses": "Hách dịch, thiếu kiên nhẫn, bốc đồng",
            "career": "Kinh doanh, thể thao, quân đội, chính trị, quản lý",
            "love": "Aries yêu thật sự và chân thành. Họ nồng nhiệt và hết mình trong tình yêu.",
            "description": "Aries là cung hoàng đạo đầu tiên, tượng trưng cho sự khởi đầu và năng lượng mới."
        },
        "taurus": {
            "name": "Taurus (Kim Ngưu)",
            "symbol": "♉",
            "dates": "20/4 - 20/5",
            "element": "Đất",
            "planet": "Sao Kim",
            "traits": "Kiên nhẫn, đáng tin cậy, thực tế, bướng bỉnh, yêu cái đẹp",
            "strengths": "Đáng tin cậy, chăm chỉ, kiên nhẫn, trung thành",
            "weaknesses": "Bướng bỉnh, ích kỷ, thiếu linh hoạt",
            "career": "Tài chính, ngân hàng, bất động sản, nghệ thuật",
            "love": "Taurus rất chung thủy. Họ cần cảm giác an toàn và ổn định.",
            "description": "Taurus tượng trưng cho sự ổn định và kiên cường."
        },
        "gemini": {
            "name": "Gemini (Song Tử)",
            "symbol": "♊",
            "dates": "21/5 - 20/6",
            "element": "Không khí",
            "planet": "Sao Thủy",
            "traits": "Linh hoạt, tò mò, giao tiếp tốt, hay thay đổi, thông minh",
            "strengths": "Linh hoạt, tò mò, giao tiếp giỏi, thông minh",
            "weaknesses": "Hay lo âu, thiếu kiên nhẫn, hai mặt",
            "career": "Truyền thông, báo chí, viết lách, giáo dục",
            "love": "Gemini cần sự kích thích trí tuệ trong tình yêu.",
            "description": "Gemini được cai quản bởi Sao Thủy, hành tinh của trí tuệ."
        },
        "cancer": {
            "name": "Cancer (Cự Giải)",
            "symbol": "♋",
            "dates": "21/6 - 22/7",
            "element": "Nước",
            "planet": "Mặt Trăng",
            "traits": "Nhạy cảm, chăm sóc, bảo vệ, gia đình, trực giác",
            "strengths": "Tình cảm, trực giác, bảo vệ, sáng tạo",
            "weaknesses": "Nhạy cảm quá mức, hay lo âu",
            "career": "Chăm sóc sức khỏe, giáo dục, bất động sản",
            "love": "Cancer rất tận tâm. Gia đình là ưu tiên hàng đầu.",
            "description": "Cancer được cai quản bởi Mặt Trăng, biểu tượng của cảm xúc."
        },
        "leo": {
            "name": "Leo (Sư Tử)",
            "symbol": "♌",
            "dates": "23/7 - 22/8",
            "element": "Lửa",
            "planet": "Mặt Trời",
            "traits": "Tự tin, hào phóng, lãnh đạo, sáng tạo, kiêu ngạo",
            "strengths": "Tự tin, hào phóng, lạc quan, sáng tạo",
            "weaknesses": "Kiêu ngạo, độc đoán, hay khoe khoang",
            "career": "Sáng tạo, giải trí, quản lý, chính trị",
            "love": "Leo yêu hết mình và mong đợi được yêu thương.",
            "description": "Leo được cai quản bởi Mặt Trời, trung tâm của vũ trụ."
        },
        "virgo": {
            "name": "Virgo (Xử Nữ)",
            "symbol": "♍",
            "dates": "23/8 - 22/9",
            "element": "Đất",
            "planet": "Sao Thủy",
            "traits": "Cầu toàn, chi tiết, thực tế, phân tích, hay giúp đỡ",
            "strengths": "Phân tích, cầu toàn, chăm chỉ, đáng tin cậy",
            "weaknesses": "Hay phê phán, lo âu, perfectionist",
            "career": "Y tế, kế toán, phân tích dữ liệu, nghiên cứu",
            "love": "Virgo thể hiện tình yêu qua hành động.",
            "description": "Virgo là cung của sự phân tích và hoàn thiện."
        },
        "libra": {
            "name": "Libra (Thiên Xứng)",
            "symbol": "♎",
            "dates": "23/9 - 22/10",
            "element": "Không khí",
            "planet": "Sao Kim",
            "traits": "Cân bằng, công bằng, hòa nhã, quyến rũ, ngoại giao",
            "strengths": "Công bằng, hòa nhã, ngoại giao, hợp tác",
            "weaknesses": "Hay do dự, tránh xung đột, thiếu quyết đoán",
            "career": "Nghệ thuật, thiết kế, luật, ngoại giao",
            "love": "Libra tìm kiếm sự hài hòa và cân bằng.",
            "description": "Libra tượng trưng cho sự cân bằng và hài hòa."
        },
        "scorpio": {
            "name": "Scorpio (Bò Cạp)",
            "symbol": "♏",
            "dates": "23/10 - 21/11",
            "element": "Nước",
            "planet": "Sao Diêm Vương",
            "traits": "Kiên cường, đam mê, bí ẩn, trực giác, quyết đoán",
            "strengths": "Dũng cảm, kiên cường, đam mê, trực giác",
            "weaknesses": "Ghen tuông, báo thù, khó tin người",
            "career": "Nghiên cứu, tâm lý học, thám tử, tài chính",
            "love": "Scorpio yêu sâu sắc và chân thành.",
            "description": "Scorpio là cung của sự biến đổi và tái sinh."
        },
        "sagittarius": {
            "name": "Sagittarius (Nhân Mã)",
            "symbol": "♐",
            "dates": "22/11 - 21/12",
            "element": "Lửa",
            "planet": "Sao Mộc",
            "traits": "Lạc quan, phiêu lưu, thẳng thắn, tự do, thông minh",
            "strengths": "Lạc quan, phiêu lưu, trung thực, rộng lượng",
            "weaknesses": "Thiếu kiên nhẫn, hay nói thẳng",
            "career": "Du lịch, giáo dục, xuất bản, triết học",
            "love": "Sagittarius cần tự do trong tình yêu.",
            "description": "Sagittarius được cai quản bởi Sao Mộc."
        },
        "capricorn": {
            "name": "Capricorn (Ma Kết)",
            "symbol": "♑",
            "dates": "22/12 - 19/1",
            "element": "Đất",
            "planet": "Sao Thổ",
            "traits": "Kỷ luật, tham vọng, kiên nhẫn, trách nhiệm, bảo thủ",
            "strengths": "Kỷ luật, kiên nhẫn, trách nhiệm, trung thành",
            "weaknesses": "Bi quan, bảo thủ, hay chỉ trích",
            "career": "Quản lý, tài chính, luật, kiến trúc",
            "love": "Capricorn nghiêm túc trong tình yêu.",
            "description": "Capricorn được cai quản bởi Sao Thổ."
        },
        "aquarius": {
            "name": "Aquarius (Bảo Bình)",
            "symbol": "♒",
            "dates": "20/1 - 18/2",
            "element": "Không khí",
            "planet": "Sao Thiên Vương",
            "traits": "Độc lập, sáng tạo, nhân đạo, không tuân theo quy ước",
            "strengths": "Sáng tạo, tiến bộ, độc lập, nhân đạo",
            "weaknesses": "Bất đồng, thiếu kiên nhẫn",
            "career": "Công nghệ, khoa học, cải cách xã hội",
            "love": "Aquarius cần sự độc lập trong tình yêu.",
            "description": "Aquarius là cung của sự đổi mới và tiến bộ."
        },
        "pisces": {
            "name": "Pisces (Song Ngư)",
            "symbol": "♓",
            "dates": "19/2 - 20/3",
            "element": "Nước",
            "planet": "Sao Hải Vương",
            "traits": "Nhạy cảm, nghệ thuật, mơ mộng, trực giác, từ bi",
            "strengths": "Nhạy cảm, nghệ thuật, trực giác, từ bi",
            "weaknesses": "Trốn tránh thực tế, thiếu ranh giới",
            "career": "Nghệ thuật, âm nhạc, tâm lý, y tế",
            "love": "Pisces yêu lãng mạn và mơ mộng.",
            "description": "Pisces là cung cuối cùng, tượng trưng cho sự hoàn thiện tâm linh."
        }
    }
    
    # Detailed zodiac information database - English
    zodiac_info_en = {
        "aries": {
            "name": "Aries (The Ram)",
            "symbol": "♈",
            "dates": "March 21 - April 19",
            "element": "Fire",
            "planet": "Mars",
            "traits": "Energetic, courageous, enthusiastic, optimistic, determined",
            "strengths": "Brave, passionate, confident, honest",
            "weaknesses": "Impatient, aggressive, impulsive",
            "career": "Business, sports, military, politics, management",
            "love": "Aries is truly in love. They are passionate and give their all.",
            "description": "Aries is the first sign of the zodiac, symbolizing new beginnings."
        },
        "taurus": {
            "name": "Taurus (The Bull)",
            "symbol": "♉",
            "dates": "April 20 - May 20",
            "element": "Earth",
            "planet": "Venus",
            "traits": "Patient, reliable, practical, stubborn, lover of beauty",
            "strengths": "Reliable, hardworking, patient, loyal",
            "weaknesses": "Stubborn, possessive, inflexible",
            "career": "Finance, banking, real estate, art",
            "love": "Taurus is very loyal. They need security and stability.",
            "description": "Taurus symbolizes stability and perseverance."
        },
        "gemini": {
            "name": "Gemini (The Twins)",
            "symbol": "♊",
            "dates": "May 21 - June 20",
            "element": "Air",
            "planet": "Mercury",
            "traits": "Adaptable, curious, communicative, changeable, intelligent",
            "strengths": "Adaptable, curious, good communicator, intelligent",
            "weaknesses": "Anxious, impatient, two-faced",
            "career": "Media, journalism, writing, education",
            "love": "Gemini needs intellectual stimulation in love.",
            "description": "Gemini is ruled by Mercury, the planet of intellect."
        },
        "cancer": {
            "name": "Cancer (The Crab)",
            "symbol": "♋",
            "dates": "June 21 - July 22",
            "element": "Water",
            "planet": "Moon",
            "traits": "Sensitive, caring, protective, family-oriented, intuitive",
            "strengths": "Emotional, intuitive, protective, creative",
            "weaknesses": "Oversensitive, anxious",
            "career": "Healthcare, education, real estate",
            "love": "Cancer is very devoted. Family comes first.",
            "description": "Cancer is ruled by the Moon, symbol of emotions."
        },
        "leo": {
            "name": "Leo (The Lion)",
            "symbol": "♌",
            "dates": "July 23 - August 22",
            "element": "Fire",
            "planet": "Sun",
            "traits": "Confident, generous, leader, creative, proud",
            "strengths": "Confident, generous, optimistic, creative",
            "weaknesses": "Proud, dominant, show-off",
            "career": "Creative, entertainment, management, politics",
            "love": "Leo loves with all their heart and expects to be loved back.",
            "description": "Leo is ruled by the Sun, the center of the universe."
        },
        "virgo": {
            "name": "Virgo (The Virgin)",
            "symbol": "♍",
            "dates": "August 23 - September 22",
            "element": "Earth",
            "planet": "Mercury",
            "traits": "Perfectionist, detail-oriented, practical, analytical, helpful",
            "strengths": "Analytical, perfectionist, hardworking, reliable",
            "weaknesses": "Critical, anxious, perfectionist",
            "career": "Healthcare, accounting, data analysis, research",
            "love": "Virgo shows love through actions.",
            "description": "Virgo is the sign of analysis and perfection."
        },
        "libra": {
            "name": "Libra (The Scales)",
            "symbol": "♎",
            "dates": "September 23 - October 22",
            "element": "Air",
            "planet": "Venus",
            "traits": "Balanced, fair, diplomatic, charming, cooperative",
            "strengths": "Fair, diplomatic, cooperative, charming",
            "weaknesses": "Indecisive, avoids conflict, passive",
            "career": "Art, design, law, diplomacy",
            "love": "Libra seeks harmony and balance in relationships.",
            "description": "Libra symbolizes balance and harmony."
        },
        "scorpio": {
            "name": "Scorpio (The Scorpion)",
            "symbol": "♏",
            "dates": "October 23 - November 21",
            "element": "Water",
            "planet": "Pluto",
            "traits": "Strong-willed, passionate, mysterious, intuitive, decisive",
            "strengths": "Brave, passionate, intuitive, loyal",
            "weaknesses": "Jealous, revengeful, distrustful",
            "career": "Research, psychology, detective work, finance",
            "love": "Scorpio loves deeply and sincerely.",
            "description": "Scorpio is the sign of transformation and rebirth."
        },
        "sagittarius": {
            "name": "Sagittarius (The Archer)",
            "symbol": "♐",
            "dates": "November 22 - December 21",
            "element": "Fire",
            "planet": "Jupiter",
            "traits": "Optimistic, adventurous, honest, freedom-loving, intelligent",
            "strengths": "Optimistic, adventurous, honest, generous",
            "weaknesses": "Impatient, blunt",
            "career": "Travel, education, publishing, philosophy",
            "love": "Sagittarius needs freedom in love.",
            "description": "Sagittarius is ruled by Jupiter."
        },
        "capricorn": {
            "name": "Capricorn (The Goat)",
            "symbol": "♑",
            "dates": "December 22 - January 19",
            "element": "Earth",
            "planet": "Saturn",
            "traits": "Disciplined, ambitious, patient, responsible, conservative",
            "strengths": "Disciplined, patient, responsible, loyal",
            "weaknesses": "Pessimistic, conservative, critical",
            "career": "Management, finance, law, architecture",
            "love": "Capricorn is serious about love.",
            "description": "Capricorn is ruled by Saturn."
        },
        "aquarius": {
            "name": "Aquarius (The Water Bearer)",
            "symbol": "♒",
            "dates": "January 20 - February 18",
            "element": "Air",
            "planet": "Uranus",
            "traits": "Independent, creative, humanitarian, unconventional, progressive",
            "strengths": "Creative, progressive, independent, humanitarian",
            "weaknesses": "Rebellious, impatient",
            "career": "Technology, science, social reform",
            "love": "Aquarius needs independence in love.",
            "description": "Aquarius is the sign of innovation and progress."
        },
        "pisces": {
            "name": "Pisces (The Fish)",
            "symbol": "♓",
            "dates": "February 19 - March 20",
            "element": "Water",
            "planet": "Neptune",
            "traits": "Sensitive, artistic, dreamy, intuitive, compassionate",
            "strengths": "Sensitive, artistic, intuitive, compassionate",
            "weaknesses": "Escapist, lack of boundaries",
            "career": "Art, music, psychology, healthcare",
            "love": "Pisces is romantic and dreamy.",
            "description": "Pisces is the last sign, symbolizing spiritual perfection."
        }
    }
    
    # Use the appropriate database based on language
    zodiac_info = zodiac_info_en if is_english else zodiac_info_vi
    
    # Check if user is asking about a specific zodiac sign
    response = None
    
    for sign, info in zodiac_info.items():
        if sign in user_message or info["name"].lower() in user_message:
            response = info
            break
    
    # Language-specific replies
    if is_english:
        if response:
            reply = f"🌟 **{response['name']}** {response['symbol']}\n\n"
            reply += f"📅 **Dates:** {response['dates']}\n\n"
            reply += f"🔥 **Element:** {response['element']}\n\n"
            reply += f"🪐 **Ruling Planet:** {response['planet']}\n\n"
            reply += f"✨ **Personality Traits:** {response['traits']}\n\n"
            reply += f"💪 **Strengths:** {response['strengths']}\n\n"
            reply += f"⚠️ **Weaknesses:** {response['weaknesses']}\n\n"
            reply += f"💼 **Career:** {response['career']}\n\n"
            reply += f"💕 **Love:** {response['love']}\n\n"
            reply += f"💫 {response['description']}\n\n"
            reply += "━━━━━━━━━━━━━━━━━━━━\n"
            reply += "Would you like to learn more about another zodiac sign?"
            
        elif any(word in user_message for word in ["hello", "hi", "hey", "start", "begin"]):
            reply = "🌟 **Hello! I am JStar's astrology assistant!** ✨\n\n"
            reply += "I can help you learn about the zodiac signs in detail!\n\n"
            reply += "📚 **You can ask me like:**\n"
            reply += "• 'Tell me about Aries'\n"
            reply += "• 'What is Leo's personality?'\n"
            reply += "• 'When is Scorpio's birthday?'\n"
            reply += "• 'Elements of zodiac signs'\n"
            reply += "• 'Love and Cancer'\n"
            reply += "• 'Career for Taurus'\n\n"
            reply += "🌟 **12 Zodiac Signs:**\n"
            reply += "Aries, Taurus, Gemini, Cancer, Leo, Virgo,\nLibra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces\n\n"
            reply += "Which zodiac sign would you like to learn about?"
            
        elif "element" in user_message or "elements" in user_message:
            reply = "🔥🌊🌬️🌍 **Elements of the 12 Zodiac Signs:**\n\n"
            reply += "━━━━━━━━━━━━━━━━━━━━\n\n"
            reply += "🔥 **FIRE** (Aries, Leo, Sagittarius)\n"
            reply += "→ Energetic, passionate, courageous\n\n"
            reply += "🌍 **EARTH** (Taurus, Virgo, Capricorn)\n"
            reply += "→ Practical, stable, reliable\n\n"
            reply += "💨 **AIR** (Gemini, Libra, Aquarius)\n"
            reply += "→ Intellectual, communicative, creative\n\n"
            reply += "💧 **WATER** (Cancer, Scorpio, Pisces)\n"
            reply += "→ Emotional, intuitive, deep\n\n"
            reply += "Which element are you interested in?"
            
        elif "love" in user_message or "romance" in user_message:
            reply = "💕 **Love and the Zodiac Signs:**\n\n"
            reply += "• Aries: Passionate, goes all in\n"
            reply += "• Taurus: Loyal, needs security\n"
            reply += "• Gemini: Needs intellectual stimulation\n"
            reply += "• Cancer: Devoted, family first\n"
            reply += "• Leo: Needs to be adored\n"
            reply += "• Virgo: Shows love through actions\n"
            reply += "• Libra: Seeks harmony\n"
            reply += "• Scorpio: Deep and intense\n"
            reply += "• Sagittarius: Needs freedom\n"
            reply += "• Capricorn: Serious and committed\n"
            reply += "• Aquarius: Needs independence\n"
            reply += "• Pisces: Romantic and dreamy\n\n"
            reply += "Which sign would you like to know more about?"
            
        elif "career" in user_message or "job" in user_message:
            reply = "💼 **Career and the Zodiac Signs:**\n\n"
            reply += "• Aries: Business, sports, leadership\n"
            reply += "• Taurus: Finance, real estate, art\n"
            reply += "• Gemini: Media, journalism, education\n"
            reply += "• Cancer: Healthcare, education\n"
            reply += "• Leo: Creative, entertainment\n"
            reply += "• Virgo: Healthcare, accounting, research\n"
            reply += "• Libra: Art, law, diplomacy\n"
            reply += "• Scorpio: Research, psychology, finance\n"
            reply += "• Sagittarius: Travel, education, publishing\n"
            reply += "• Capricorn: Management, finance, law\n"
            reply += "• Aquarius: Technology, science\n"
            reply += "• Pisces: Art, music, psychology\n\n"
            reply += "Which sign interests you?"
            
        elif "personality" in user_message or "traits" in user_message or "character" in user_message:
            found_sign = None
            for sign, info in zodiac_info.items():
                if sign in user_message or info["name"].lower() in user_message:
                    found_sign = info
                    break
            
            if found_sign:
                reply = f"📖 **{found_sign['name']} Personality:**\n\n"
                reply += f"✨ **{found_sign['traits']}**\n\n"
                reply += f"💪 **Strengths:** {found_sign['strengths']}\n\n"
                reply += f"⚠️ **Weaknesses:** {found_sign['weaknesses']}\n\n"
                reply += f"💫 {found_sign['description']}\n\n"
                reply += "Would you like to know more?"
            else:
                reply = "📖 **Personality of the Zodiac Signs:**\n\n"
                reply += "🔥 **Fire Signs:** Aries, Leo, Sagittarius - Energetic, passionate\n\n"
                reply += "🌍 **Earth Signs:** Taurus, Virgo, Capricorn - Practical, stable\n\n"
                reply += "💨 **Air Signs:** Gemini, Libra, Aquarius - Intellectual, communicative\n\n"
                reply += "💧 **Water Signs:** Cancer, Scorpio, Pisces - Emotional, intuitive\n\n"
                reply += "Which sign would you like to know more about?"
                
        elif "birthday" in user_message or "dates" in user_message:
            reply = "📅 **Birth Dates of 12 Zodiac Signs:**\n\n"
            reply += "🔥 Aries: March 21 - April 19\n"
            reply += "🌿 Taurus: April 20 - May 20\n"
            reply += "👯 Gemini: May 21 - June 20\n"
            reply += "🦀 Cancer: June 21 - July 22\n"
            reply += "🦁 Leo: July 23 - August 22\n"
            reply += "👸 Virgo: August 23 - September 22\n"
            reply += "⚖️ Libra: September 23 - October 22\n"
            reply += "🦂 Scorpio: October 23 - November 21\n"
            reply += "🏹 Sagittarius: November 22 - December 21\n"
            reply += "🐐 Capricorn: December 22 - January 19\n"
            reply += "🏺 Aquarius: January 20 - February 18\n"
            reply += "🐟 Pisces: February 19 - March 20\n\n"
            reply += "Which sign are you?"
            
        else:
            reply = "🌟 **I can help you learn about the zodiac signs!**\n\n"
            reply += "📚 **You can ask me like:**\n"
            reply += "• 'Tell me about Aries'\n"
            reply += "• 'What is Leo's personality?'\n"
            reply += "• 'When is Scorpio's birthday?'\n"
            reply += "• 'Elements of zodiac signs'\n"
            reply += "• 'Love and Cancer'\n"
            reply += "• 'Career for Taurus'\n\n"
            reply += "🌟 **Or choose from:**\n"
            reply += "Aries, Taurus, Gemini, Cancer, Leo, Virgo,\nLibra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces\n\n"
            reply += "Which zodiac sign would you like to learn about?"
    else:
        # Vietnamese responses
        if response:
            reply = f"🌟 **{response['name']}** {response['symbol']}\n\n"
            reply += f"📅 **Ngày sinh:** {response['dates']}\n\n"
            reply += f"🔥 **Nguyên tố:** {response['element']}\n\n"
            reply += f"🪐 **Hành tinh cai quản:** {response['planet']}\n\n"
            reply += f"✨ **Đặc điểm tính cách:** {response['traits']}\n\n"
            reply += f"💪 **Điểm mạnh:** {response['strengths']}\n\n"
            reply += f"⚠️ **Điểm yếu:** {response['weaknesses']}\n\n"
            reply += f"💼 **Sự nghiệp:** {response['career']}\n\n"
            reply += f"💕 **Tình yêu:** {response['love']}\n\n"
            reply += f"💫 {response['description']}\n\n"
            reply += "━━━━━━━━━━━━━━━━━━━━\n"
            reply += "Bạn có muốn biết thêm về cung hoàng đạo nào khác không?"
            
        elif any(word in user_message for word in ["xin chào", "chào", "hello", "hi", "hey", "ban đầu"]):
            reply = "🌟 **Xin chào! Tôi là trợ lý chiêm tinh của JStar!** ✨\n\n"
            reply += "Tôi có thể giúp bạn tìm hiểu về các cung hoàng đạo một cách chi tiết!\n\n"
            reply += "📚 **Bạn có thể hỏi tôi như:**\n"
            reply += "• 'Aries là gì?' / 'Cho tôi biết về Aries'\n"
            reply += "• 'Tính cách của Leo như thế nào?'\n"
            reply += "• 'Ngày sinh của Scorpio là khi nào?'\n"
            reply += "• 'Nguyên tố của các cung hoàng đạo'\n"
            reply += "• 'Tình yêu của Cancer ra sao?'\n"
            reply += "• 'Sự nghiệp phù hợp với Taurus'\n\n"
            reply += "🌟 **12 Cung hoàng đạo:**\n"
            reply += "Aries, Taurus, Gemini, Cancer, Leo, Virgo,\nLibra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces\n\n"
            reply += "Bạn muốn tìm hiểu về cung hoàng đạo nào?"
            
        elif "nguyên tố" in user_message or "element" in user_message:
            reply = "🔥🌊🌬️🌍 **Nguyên tố của 12 cung hoàng đạo:**\n\n"
            reply += "━━━━━━━━━━━━━━━━━━━━\n\n"
            reply += "🔥 **LỬA** (Aries, Leo, Sagittarius)\n"
            reply += "→ Năng động, nhiệt huyết, can đảm\n\n"
            reply += "🌍 **ĐẤT** (Taurus, Virgo, Capricorn)\n"
            reply += "→ Thực tế, ổn định, đáng tin cậy\n\n"
            reply += "💨 **KHÔNG KHÍ** (Gemini, Libra, Aquarius)\n"
            reply += "→ Tư duy, giao tiếp, sáng tạo\n\n"
            reply += "💧 **NƯỚC** (Cancer, Scorpio, Pisces)\n"
            reply += "→ Cảm xúc, trực giác, sâu sắc\n\n"
            reply += "Bạn thuộc cung nguyên tố nào?"
            
        elif "tình yêu" in user_message or "love" in user_message:
            reply = "💕 **Tình yêu và các cung hoàng đạo:**\n\n"
            reply += "• Aries: Nồng nhiệt, chủ động, hết mình\n"
            reply += "• Taurus: Chung thủy, cần cảm giác an toàn\n"
            reply += "• Gemini: Cần kích thích trí tuệ\n"
            reply += "• Cancer: Tận tâm, gia đình là trên hết\n"
            reply += "• Leo: Cần được ngưỡng mộ\n"
            reply += "• Virgo: Thể hiện qua hành động\n"
            reply += "• Libra: Tìm kiếm sự cân bằng\n"
            reply += "• Scorpio: Mãnh liệt và sâu sắc\n"
            reply += "• Sagittarius: Cần tự do\n"
            reply += "• Capricorn: Nghiêm túc và chu đáo\n"
            reply += "• Aquarius: Cần sự độc lập\n"
            reply += "• Pisces: Lãng mạn và mơ mộng\n\n"
            reply += "Bạn muốn biết chi tiết về cung nào?"
            
        elif "sự nghiệp" in user_message or "career" in user_message or "nghề" in user_message:
            reply = "💼 **Sự nghiệp và các cung hoàng đạo:**\n\n"
            reply += "• Aries: Kinh doanh, thể thao, lãnh đạo\n"
            reply += "• Taurus: Tài chính, bất động sản, nghệ thuật\n"
            reply += "• Gemini: Truyền thông, báo chí, giáo dục\n"
            reply += "• Cancer: Y tế, giáo dục, bất động sản\n"
            reply += "• Leo: Sáng tạo, giải trí, quản lý\n"
            reply += "• Virgo: Y tế, kế toán, nghiên cứu\n"
            reply += "• Libra: Nghệ thuật, luật, ngoại giao\n"
            reply += "• Scorpio: Nghiên cứu, tâm lý, tài chính\n"
            reply += "• Sagittarius: Du lịch, giáo dục, xuất bản\n"
            reply += "• Capricorn: Quản lý, tài chính, luật\n"
            reply += "• Aquarius: Công nghệ, khoa học\n"
            reply += "• Pisces: Nghệ thuật, âm nhạc, tâm lý\n\n"
            reply += "Bạn thuộc cung nào?"
            
        elif "tính cách" in user_message or "đặc điểm" in user_message or "tính" in user_message:
            found_sign = None
            for sign, info in zodiac_info.items():
                if sign in user_message or info["name"].lower() in user_message:
                    found_sign = info
                    break
            
            if found_sign:
                reply = f"📖 **Tính cách của {found_sign['name']}:**\n\n"
                reply += f"✨ **{found_sign['traits']}**\n\n"
                reply += f"💪 **Điểm mạnh:** {found_sign['strengths']}\n\n"
                reply += f"⚠️ **Điểm yếu:** {found_sign['weaknesses']}\n\n"
                reply += f"💫 {found_sign['description']}\n\n"
                reply += "Bạn có muốn biết thêm về khía cạnh nào khác không?"
            else:
                reply = "📖 **Tính cách của các cung hoàng đạo:**\n\n"
                reply += "🔥 **Cung Lửa:** Aries, Leo, Sagittarius - Năng động, nhiệt huyết\n\n"
                reply += "🌍 **Cung Đất:** Taurus, Virgo, Capricorn - Thực tế, ổn định\n\n"
                reply += "💨 **Cung Không khí:** Gemini, Libra, Aquarius - Tư duy, giao tiếp\n\n"
                reply += "💧 **Cung Nước:** Cancer, Scorpio, Pisces - Cảm xúc, trực giác\n\n"
                reply += "Bạn muốn biết chi tiết về cung nào?"
                
        elif "ngày sinh" in user_message or "sinh ngày" in user_message or "sinh" in user_message:
            reply = "📅 **Ngày sinh của 12 cung hoàng đạo:**\n\n"
            reply += "🔥 Aries: 21/3 - 19/4\n"
            reply += "🌿 Taurus: 20/4 - 20/5\n"
            reply += "👯 Gemini: 21/5 - 20/6\n"
            reply += "🦀 Cancer: 21/6 - 22/7\n"
            reply += "🦁 Leo: 23/7 - 22/8\n"
            reply += "👸 Virgo: 23/8 - 22/9\n"
            reply += "⚖️ Libra: 23/9 - 22/10\n"
            reply += "🦂 Scorpio: 23/10 - 21/11\n"
            reply += "🏹 Sagittarius: 22/11 - 21/12\n"
            reply += "🐐 Capricorn: 22/12 - 19/1\n"
            reply += "🏺 Aquarius: 20/1 - 18/2\n"
            reply += "🐟 Pisces: 19/2 - 20/3\n\n"
            reply += "Bạn thuộc cung nào?"
            
        else:
            reply = "🌟 **Tôi có thể giúp bạn tìm hiểu về các cung hoàng đạo!**\n\n"
            reply += "📚 **Bạn có thể hỏi tôi như:**\n"
            reply += "• 'Aries là gì?' / 'Cho tôi biết về Aries'\n"
            reply += "• 'Tính cách của Leo như thế nào?'\n"
            reply += "• 'Ngày sinh của Scorpio là khi nào?'\n"
            reply += "• 'Nguyên tố của các cung hoàng đạo'\n"
            reply += "• 'Tình yêu của Cancer ra sao?'\n"
            reply += "• 'Sự nghiệp phù hợp với Taurus'\n\n"
            reply += "🌟 **Hoặc bạn có thể chọn:**\n"
            reply += "Aries, Taurus, Gemini, Cancer, Leo, Virgo,\nLibra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces\n\n"
            reply += "Bạn muốn biết về cung hoàng đạo nào?"
    
    return jsonify({'reply': reply})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)

