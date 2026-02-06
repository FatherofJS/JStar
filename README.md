# JStar

## Cài đặt

```bash
# Cài đặt thư viện
npm install

# Chạy dev server
npm run dev
```
Mở: http://localhost:5173

---

## Thư viện đã cài

| Thư viện | Mục đích |
|----------|----------|
| `@tabler/icons-react` | Icon library |
| `react` | UI framework |

### Fonts (Google Fonts)
- **Space Grotesk** - Font chính
- **Inter** - Font phụ
- **Outfit** - Font phụ

---

## Cấu trúc dự án

```
src/
├── App.tsx           # Layout chính
├── App.css           # Layout styles
├── index.css         # CSS variables + base styles
├── types/chart.ts    # TypeScript interfaces
├── data/mockData.ts  # Dữ liệu test
└── components/
    ├── BirthForm.tsx   → FE1
    ├── ChartWheel.tsx  → FE2
    ├── PlanetTable.tsx → FE3
    ├── InfoPanel.tsx   → FE3
    ├── HousePanel.tsx  → FE3
    ├── AspectPanel.tsx → FE3
    ├── LandingPage.tsx → FE4
    ├── Sidebar.tsx     → FE5
    └── Header.tsx      → FE5
    
```

---

## Sử dụng Mock Data

```tsx
import { MOCK_CHART } from '../data/mockData';

const { planets, houses, aspects, angles, subject } = MOCK_CHART;
```

### Dữ liệu có sẵn
- **13 Planets**: Sun → Pluto + Chiron + Nodes
- **12 Houses**: Placidus system
- **27 Aspects**: Đã sắp xếp theo orb
- **4 Angles**: Asc, Dsc, MC, IC

---

## CSS Variables

```css
/* Backgrounds */
--bg-primary: #0a0f1a;
--bg-secondary: #111827;

/* Accent */
--accent: #ff4757;

/* Elements */
--fire: #f97316;
--earth: #22c55e;
--air: #38bdf8;
--water: #a855f7;

/* Aspects */
--aspect-conjunction: #ffd93d;
--aspect-opposition: #ff6b8a;
--aspect-trine: #6bcbff;
--aspect-square: #ff4757;
--aspect-sextile: #50fa7b;
```

---

## Sử dụng Icons

```tsx
import { IconStar, IconMoon, IconSun } from '@tabler/icons-react';

<IconStar size={20} />
<IconMoon size={20} stroke={1.5} />
```

Xem tất cả icons: https://tabler.io/icons
