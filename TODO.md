# Performance Optimization TODO

## Task: Fix occasional lag issues in the JStar application

### Identified Issues:
1. **ZodiacCinematic**: Star intensity/size recalculates on every render (random values each time)
2. **Background**: Heavy CSS blur filters (60px, 40px) causing repaint issues during scroll
3. **Scroll handlers**: Multiple hooks listening to scroll events separately
4. **Missing performance optimizations**: No `will-change` hints, no memoization

### Fix Plan:

- [x] 1. Fix ZodiacCinematic - Memoize star intensity/size to avoid recalculation on every render
- [x] 2. Fix Background - Use CSS `will-change` and optimize transitions for scroll
- [x] 3. Optimize useScrollPosition - Use ref-based approach to avoid state updates during scroll
- [x] 4. Add performance optimizations to LandingPage - Memoize components, use React.memo
- [x] 5. Optimize Background.styles.ts - Reduce blur complexity, add will-change hints

### Completed:
All performance optimizations have been applied successfully. The build passes without errors.

### Summary of Changes:
1. **ZodiacCinematic.tsx**: Added `useMemo` for star data, `useCallback` for event handlers
2. **Background.tsx**: Added throttled scroll updates (rounded to nearest 10)
3. **Background.styles.ts**: Added `will-change` hints to all animated elements
4. **useScrollPosition.ts**: Changed from closure variable to useRef for ticking
5. **useSectionObserver.ts**: Added useRef to avoid stale closures
6. **LandingPage.tsx**: Added `memo` for NavItem, `useCallback` for handlers
7. **SpaceButton.tsx**: Added `memo` for particles, `useCallback` for all handlers

### Testing:
Run `npm run build` to verify the application builds successfully.

