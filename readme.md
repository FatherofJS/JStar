# JStar - Running Separate Frontend and Backend

This project is configured to run frontend (React + Vite) and backend (Python Flask) separately for better maintainability, permissions, and independent deployment.

## Prerequisites

- **Frontend**: Node.js 18+, npm
- **Backend**: Python 3.11+, Conda (or virtualenv)

## Project Structure

```
JStar/
├── frontend/          # React + Vite (src/)
├── backend/           # Python Flask
│   ├── app.py        # Main Flask application
│   ├── src/          # Backend source code
│   └── .env          # Backend environment variables
├── .env              # Frontend environment variables
└── vite.config.ts    # Vite configuration
```

## Running the Application

### Option 1: Run Both Separately (Recommended for Development)

#### 1. Start Backend (Flask)

Using Conda (recommended):
```bash
cd backend
conda activate jstar
python app.py
```

Or using the run script:
```bash
cd backend
./run.sh
```

The backend will run on `http://localhost:5001`

#### 2. Start Frontend (Vite)

```bash
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### Option 2: Using Vite Proxy (Legacy)

If you want to use Vite's proxy in development:
1. Create or edit `.env` file:
   ```
   VITE_API_URL=http://localhost:5001
   VITE_USE_PROXY=true
   ```
2. Run frontend: `npm run dev`
3. The proxy will forward `/api` requests to the backend

**Note**: This option is for backward compatibility only. It's recommended to run backend separately.

## Environment Variables

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5001
VITE_USE_PROXY=false
```

- `VITE_API_URL`: Backend API URL (use deployed URL in production)
- `VITE_USE_PROXY`: Set to 'true' to use Vite proxy (default: false)

### Backend (backend/.env)

```env
FLASK_APP=app.py
FLASK_ENV=development
PORT=5001
SECRET_KEY=dev-secret-key-change-in-production
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

- `PORT`: Backend server port (default: 5001)
- `CORS_ORIGINS`: Allowed origins for CORS (comma-separated)

## Production Deployment

### Backend

```bash
cd backend
conda activate jstar
export FLASK_ENV=production
export SECRET_KEY=your-secure-secret-key
python app.py
```

Or use a production WSGI server like Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5001 app:app
```

### Frontend

```bash
npm run build
```

The built files will be in the `dist/` directory and can be deployed to any static hosting service (Netlify, Vercel, etc.).

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/location/search?q=<query>&limit=<n>` - Search locations
- `GET /api/location/reverse?lat=<lat>&lon=<lon>` - Reverse geocoding

## Troubleshooting

### CORS Errors

If you encounter CORS errors:
1. Check that `CORS_ORIGINS` in `backend/.env` includes your frontend URL
2. Ensure the backend is running before the frontend makes API calls

### Connection Refused

If the frontend can't connect to the backend:
1. Ensure the backend is running on the correct port
2. Check that `VITE_API_URL` in `.env` matches the backend URL
3. For development, you can also enable proxy in vite.config.ts

### Environment Variables Not Loading

- Frontend: Restart the Vite dev server after changing `.env`
- Backend: Restart the Flask server after changing `backend/.env`

