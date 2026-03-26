# JStar - Nền Tảng Chiêm Tinh Học 

**JStar** không chỉ là một ứng dụng xem bản đồ sao thông thường. Đây là nơi kết hợp giữa dữ liệu thiên văn chính xác từ NASA (thông qua Kerykeion) và một hệ thống diễn giải "thô nhưng thật". Chúng tôi không nói những điều bạn muốn nghe, chúng tôi nói những điều các vì sao đang cố gắng cảnh báo bạn.

---

## 🌟 Tính Năng Chính

### 1. Phân Tích Bản Đồ Sao Cá Nhân (Natal Chart)
- Tính toán chính xác vị trí các hành tinh, nhà (houses) và các góc chiếu (aspects) tại thời điểm bạn chào đời.
- Diễn giải chi tiết về tính cách, tiềm năng tài chính, và cả những "góc khuất" mà bạn thường giấu kín.

### 2. So Kèo Tình Duyên (Synastry Chart)
- Phân tích tương tác giữa hai bản đồ sao để đánh giá mức độ tương hợp.
- Cảnh báo về các xung đột tiềm tàng và dự báo về sự bền vững của mối quan hệ.

### 3. Trợ Lý Ảo JStar (AI Astrology Assistant)
- Tích hợp mô hình ngôn ngữ lớn (LLM) để trả lời các câu hỏi chuyên sâu về chiêm tinh.
- Persona: Thông minh, hóm hỉnh, và đôi khi là hơi "vả" vào mặt người dùng bằng sự thật.

### 4. Gallery Easter Egg
- Một tính năng bí mật lưu trữ các khoảnh khắc của đội ngũ phát triển, tích hợp trực tiếp với Cloudinary.

---

## 💻 Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Vanilla CSS & Styled Components

### Backend
- **Framework**: FastAPI (Python 3.12)
- **Astrology Engine**: Kerykeion (Swiss Ephemeris)
- **AI/LLM**: Groq (Llama 3 models)
- **Image Hosting**: Cloudinary

---

## 🚀 Hướng Dẫn Cài Đặt (Local Setup)

### Bước 1: Chuẩn bị Backend
1. Đảm bảo bạn đã cài đặt **Python 3.12+**.
2. Di chuyển vào thư mục `JStar_Backend`.
3. Cài đặt các thư viện bổ trợ: `pip install -r requirements.txt`.
4. Cấu hình file `.env` (xem phần dưới).
5. Khởi chạy server: `uvicorn app.main:app --reload`.

### Bước 2: Chuẩn bị Frontend
1. Di chuyển vào thư mục `JStar`.
2. Cài đặt dependencies: `npm install`.
3. Cấu hình file `.env` (trỏ `VITE_API_URL` về backend của bạn).
4. Khởi chạy: `npm run dev`.

---

## 🔑 Cấu Hình Biến Môi Trường (Environment Variables)

Hệ thống yêu cầu các key sau để hoạt động hoàn chỉnh:

**Backend (`.env`):**
- `GROQ_API_KEYS`: Danh sách key API từ Groq (phân tách bằng dấu phẩy).
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Thông tin từ Cloudinary.
- `FRONTEND_URL`: Danh sách URL frontend được phép truy cập (CORS).

**Frontend (`.env`):**
- `VITE_API_URL`: URL của backend (mặc định: `http://localhost:8000`).
- `VITE_CLOUDINARY_CLOUD_NAME`: Tên cloud của bạn trên Cloudinary.

---

## ⚠️ Miễn Trừ Trách Nhiệm

*Mọi thông tin do JStar cung cấp chỉ mang tính chất tham khảo và giải trí. Chúng tôi không chịu trách nhiệm nếu bạn quyết định chia tay hoặc nghỉ việc chỉ vì "các vì sao bảo thế". Hãy dùng lý trí trước khi dùng chiêm tinh!*

---
© 2026 FatherOfJS Team. Chúc bạn có những trải nghiệm "tỉnh người" cùng các vì sao!
