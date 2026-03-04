# JStar ✨

Astrology natal chart calculator. Enter birth details → get a visual chart wheel with zodiac signs, planet positions, house cusps, and aspect lines.

## Stack

- **Frontend**: React 19 + Vite + TypeScript + styled-components
- **Backend**: FastAPI + Kerykeion (astrology engine) + Nominatim (geocoding)

## Setup

### Frontend

```bash
cd JStar
npm install
npm run dev
```

Runs on `http://localhost:5173`

### Backend

```bash
cd JStar_Backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Runs on `http://localhost:8000` — Swagger docs at `/docs`

## Project Structure

```
JStar/                          # Frontend
├── src/
│   ├── App.tsx                 # Routes: / → /star-chart → /chart
│   ├── components/
│   │   ├── LandingPage.tsx     # Landing page
│   │   ├── StarChartPage.tsx   # Birth data form
│   │   ├── ChartViewPage.tsx   # Chart display page
│   │   ├── ChartWheel.tsx      # SVG natal chart wheel
│   │   ├── Header.tsx          # Chart controls
│   │   ├── LocationAutocomplete.tsx
│   │   ├── landing/            # Landing page sections
│   │   ├── background/         # Star background animation
│   │   └── button/             # Styled buttons
│   ├── constants/index.ts      # API config
│   ├── contexts/               # Theme + Language providers
│   ├── data/                   # Mock data + zodiac data
│   ├── hooks/                  # Custom hooks
│   └── types/chart.ts          # Shared TypeScript types

JStar_Backend/                  # Backend
├── app/
│   ├── main.py                 # FastAPI app setup + CORS
│   ├── models.py               # Pydantic models
│   └── routes/
│       ├── chart.py            # POST /chart — natal chart
│       └── location.py         # GET /api/location/search
└── requirements.txt
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/chart` | Calculate natal chart |
| `GET` | `/api/location/search?q=...` | City autocomplete |
| `GET` | `/api/location/search-countries?q=...` | Country search |

## Environment

Create `.env` in `JStar/` (optional):
```
VITE_API_URL=http://localhost:8000
```
