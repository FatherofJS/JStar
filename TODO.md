# TODO: Chatbot Implementation

## Plan:
1. [x] Analyze project structure and understand requirements
2. [x] Create backend API endpoint for chatbot (Flask)
3. [x] Create Chatbot styles component
4. [x] Create Chatbot React component with fallback mode
5. [x] Integrate Chatbot into App.tsx
6. [x] Test the implementation

## Details:
- Backend: Add /api/chatbot endpoint in backend/app.py ✓
- Frontend: Create Chatbot component with cosmic theme ✓
- Features: Floating button, chat window, message history, API integration ✓
- Fallback: Offline mode with local responses when API unavailable ✓

## Files Created:
- `src/components/chatbot/Chatbot.styles.ts` - Styled components
- `src/components/chatbot/Chatbot.tsx` - Chatbot component with fallback
- `src/components/chatbot/index.ts` - Export file
- `backend/app.py` - Added chatbot API endpoint

## To Test:
1. Start backend: `cd backend && python app.py`
2. Start frontend: `npm run dev`
3. Open browser and click the chat button at bottom right

