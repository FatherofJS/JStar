# Task: Make stars brighter and add scroll-based viewing angle change

## Plan

### 1. Update useScrollPosition hook
- Modify to return scrollY value instead of just isScrolled boolean
- This will allow us to track the actual scroll position for the parallax effect

### 2. Update Background component
- Accept scrollY prop to pass to StarField styled component
- Pass the scroll position to enable 3D perspective transform

### 3. Update Background.styles.ts
- **Make stars brighter**: Increase opacity values in StarField
  - Before pseudo-element: increase from 0.15 to 0.5 (much brighter)
  - After pseudo-element: increase from 0.25 to 0.8 (much brighter)
- **Add scroll-based viewing angle**: Add transform based on scrollY
  - Use perspective and rotateX to create a 3D viewing angle effect
  - As user scrolls down, stars will appear to tilt/rotate

## Files to edit:
1. `src/hooks/useScrollPosition.ts` - Return scrollY value
2. `src/components/Background.tsx` - Accept and pass scrollY prop
3. `src/styles/Background.styles.ts` - Increase brightness and add scroll transform

## Completed Steps:
- [x] Updated useScrollPosition hook to return scrollY value
- [x] Updated Background component to use scrollY from useScrollPosition
- [x] Updated Background.styles.ts to make stars brighter and add scroll-based viewing angle
- [x] Fixed pre-existing NavItem $active prop error in LandingPage.tsx
- [x] Verified build is successful

