# TODO: Auto-populate country when city is selected in birth place

## Task: When selecting a city in the birth place, automatically show the country of that city in the country field.

### Steps:
1. [x] Read and understand the codebase (LocationAutocomplete.tsx, StarChartPage.tsx, location.py)
2. [x] Modify StarChartPage.tsx to auto-populate country when city is selected
3. [x] Test the changes

### Implementation Details:
- In StarChartPage.tsx, create a handler for city selection that:
  1. Sets the selectedCity
  2. Automatically creates a LocationData object for the country based on the city's country property
- The country field will still be editable if user wants to change it manually

