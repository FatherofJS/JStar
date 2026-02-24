# Language Switching Implementation Plan

## Task: Translate landing page content when language changes

## Steps to Complete:

### 1. Update LanguageContext.tsx
- [x] Add translations for Header navigation (Home, Features, Pricing)
- [x] Add translations for HeroSection (title, description, buttons)
- [x] Add translations for Landing Features (badge, title, description, items)
- [x] Add translations for PricingSection
- [x] Add translations for GetStartedSteps
- [x] Add translations for CTASection
- [x] Add translations for Footer
- [x] Add translations for Change Password modal

### 2. Create language-specific features data
- [x] Create a hook (useTranslatedFeatures) to get translated features based on current language

### 3. Update components to use useLanguage()
- [x] Update Header.tsx - navigation items
- [x] Update HeroSection.tsx - title, description, buttons
- [x] Update LandingPage.tsx - change password modal + use translated features
- [x] Update PricingSection.tsx - all pricing text
- [x] Update GetStartedSteps.tsx - steps content
- [x] Update CTASection.tsx - CTA text
- [x] Update Footer.tsx - footer links

### 4. Update button components
- [x] Update StarPlayButton to accept children

### 5. Backend Integration
- [x] Add /api/features endpoint in backend/app.py (supports en, vi, ja)
- [x] Create useFeaturesFromAPI hook to fetch features from backend
- [x] Add fallback to local data when API is unavailable

### 6. Update Components for Language
- [x] Update Header.tsx - navigation items (home, features, pricing)
- [x] Update HeroSection.tsx - title, description, buttons
- [x] Update PricingSection.tsx - all pricing text
- [x] Update GetStartedSteps.tsx - steps content
- [x] Update CTASection.tsx - CTA text
- [x] Update Footer.tsx - footer links
- [x] Update LandingPage.tsx - change password modal

### 7. Testing
- [x] Test language switching on landing page
- [x] Verify all text changes correctly
- [x] Build successful

## Status: Complete ✓

