# TODO: WheelChart with User Birth Date via Backend

## Backend Tasks - COMPLETED ✅
- [x] 1. Add `pyswisseph` to requirements.txt for astrological calculations
- [x] 2. Create `backend/src/routes/chart.py` with chart calculation endpoint
- [x] 3. Register new chart blueprint in `backend/app.py`

## Frontend Tasks - COMPLETED ✅
- [x] 4. Update `StarChartPage.tsx` to pass birth data to ChartWheel via navigate
- [x] 5. Create `useChartApi` hook to fetch chart data from backend
- [x] 6. Update `ChartWheel.tsx` to fetch data from backend instead of using MOCK_CHART

## Testing - COMPLETED ✅
- [x] 7. Test the complete flow: Enter birth date → View Chart → See personalized chart

## Implementation Summary

### Backend Flow:
1. User enters birth date, time, and location in StarChartPage
2. Data is passed to ChartWheel via React Router state
3. ChartWheel calls `useChartApi.fetchChart()` with birth data
4. Backend `/api/chart/calculate` endpoint calculates:
   - Planet positions based on birth date/time
   - Ascendant based on birth location (latitude/longitude)
   - Houses and aspects
5. Backend returns complete ChartData to frontend

### Key Files:
- `backend/src/routes/chart.py` - Chart calculation logic
- `src/hooks/useChartApi.ts` - API hook for fetching chart
- `src/components/ChartWheel.tsx` - Displays the chart
- `src/components/StarChartPage.tsx` - User input form
