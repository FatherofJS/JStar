export interface LandingContent {
  account: string;
  changePassword: string;
  logout: string;
  login: string;
  home: string;
  features: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  getStarted: string;
  scrollDown: string;
  featuresTitle: string;
  featuresDescription: string;
  interactiveChartsBadge: string;
  interactiveChartsTitle: string;
  interactiveChartsDescription: string;
  interactiveChartsItems: string[];
  chartDataBadge: string;
  chartDataTitle: string;
  chartDataDescription: string;
  chartDataItems: string[];
  transitAnalysisBadge: string;
  transitAnalysisTitle: string;
  transitAnalysisDescription: string;
  transitAnalysisItems: string[];
  aspectGridBadge: string;
  aspectGridTitle: string;
  aspectGridDescription: string;
  aspectGridItems: string[];
  transitTimelineBadge: string;
  transitTimelineTitle: string;
  transitTimelineDescription: string;
  transitTimelineItems: string[];
  ephemerisBadge: string;
  ephemerisTitle: string;
  ephemerisDescription: string;
  ephemerisItems: string[];
  positionTablesBadge: string;
  positionTablesTitle: string;
  positionTablesDescription: string;
  positionTablesItems: string[];
  dataManagementBadge: string;
  dataManagementTitle: string;
  dataManagementDescription: string;
  dataManagementItems: string[];
  aiInterpretationsBadge: string;
  aiInterpretationsTitle: string;
  aiInterpretationsDescription: string;
  aiInterpretationsItems: string[];
  getStartedTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
  ctaNote: string;
  footerAbout: string;
  footerPrivacy: string;
  footerTerms: string;
  footerAccessibility: string;
  footerCookies: string;
  changePasswordTitle: string;
  currentPassword: string;
  enterCurrentPassword: string;
  newPassword: string;
  enterNewPassword: string;
  confirmPassword: string;
  confirmNewPassword: string;
  passwordChangedSuccess: string;
  passwordsDoNotMatch: string;
  passwordTooShort: string;
  changePasswordBtn: string;
  changingPassword: string;
  signIn: string;
  signUp: string;
  welcomeBack: string;
  beginJourney: string;
  fullName: string;
  emailAddress: string;
  password: string;
  enterYourName: string;
  enterYourEmail: string;
  enterYourPassword: string;
  emailIsRequired: string;
  validEmail: string;
  passwordIsRequired: string;
  passwordMinLength: string;
  nameIsRequired: string;
  signingIn: string;
  createAccount: string;
  orContinueWith: string;
  forgotPassword: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  incorrectPassword: string;
  noAccountFound: string;
  loginFailed: string;
}

export const landingContent: LandingContent = {
  account: 'Account',
  changePassword: 'Change Password',
  logout: 'Logout',
  login: 'Login',
  home: 'Home',
  features: 'Features',
  heroTitle: 'JSTAR',
  heroSubtitle: 'KNOW YOUR STAR',
  heroDescription:
    'Professional astrology software for accurate natal charts, transits, synastry, and AI-powered interpretations. Discover your cosmic identity.',
  getStarted: 'GET STARTED',
  scrollDown: 'Scroll to features',
  featuresTitle: 'Features',
  featuresDescription: 'Discover our powerful astrology tools',
  interactiveChartsBadge: 'Interactive Charts',
  interactiveChartsTitle: 'Beautiful, Precise Astrology Charts',
  interactiveChartsDescription:
    'High-precision SVG charts with interactive hover states, customizable themes, and detailed planetary positions. Every chart is calculated with astronomical accuracy.',
  interactiveChartsItems: [
    'Natal, Transits, Synastry, Composite charts',
    'Solar and Lunar Return charts',
    'Multiple house systems (Placidus, Whole Sign, Koch...)',
    'Tropical and Sidereal zodiac options',
  ],
  chartDataBadge: 'Chart Data',
  chartDataTitle: 'Complete Chart Analysis',
  chartDataDescription:
    'Every chart includes a comprehensive Data tab with all the details you need. Planetary positions, house placements, aspects, and element distributions at your fingertips.',
  chartDataItems: [
    'Chart highlights with key placements',
    'Lunar phase and aspect details',
    'Element and quality distribution charts',
    'Complete planetary positions table',
  ],
  transitAnalysisBadge: 'Transit Analysis',
  transitAnalysisTitle: 'Real-Time Planetary Transits',
  transitAnalysisDescription:
    'Overlay current planetary positions on any natal chart. Track how transiting planets interact with natal placements to understand timing and influences.',
  transitAnalysisItems: [
    'Dual-ring chart with natal and transit positions',
    'Aspect lines between transit and natal planets',
    'Customizable transit date selection',
    'Instant aspect calculations',
  ],
  aspectGridBadge: 'Aspect Grid',
  aspectGridTitle: 'Complete Aspect Overview',
  aspectGridDescription:
    'View all planetary aspects at a glance with our interactive aspect grid. Quickly identify harmonious and challenging configurations in any chart comparison.',
  aspectGridItems: [
    'Color-coded aspect types (conjunction, trine, square...)',
    'Orb values displayed for each aspect',
    'Filter by aspect type or planet',
    'Works with natal, transit, and synastry charts',
  ],
  transitTimelineBadge: 'Transit Timeline',
  transitTimelineTitle: 'Track Upcoming Transits',
  transitTimelineDescription:
    'See exactly when transits will be exact with the timeline view. Plan ahead with precise dates for applying and separating aspects.',
  transitTimelineItems: [
    'Chronological list of transit events',
    'Exact dates and times for aspect perfection',
    'Filter by planet, aspect type, or date range',
    'Retrograde and direct station markers',
  ],
  ephemerisBadge: 'Ephemeris & Tables',
  ephemerisTitle: 'Visual Planetary Ephemeris',
  ephemerisDescription:
    'Explore planetary positions with both graphical and tabular views. Track planetary movements across the zodiac over any time period.',
  ephemerisItems: [
    'Graphical ephemeris chart with planetary tracks',
    'Detailed position tables by date',
    'Retrograde periods clearly highlighted',
    'Export data for research and reference',
  ],
  positionTablesBadge: 'Position Tables',
  positionTablesTitle: 'Detailed Position Data',
  positionTablesDescription:
    'Access precise planetary positions for any date range. Perfect for research, mundane astrology, and verifying chart calculations.',
  positionTablesItems: [
    'Daily positions for all planets',
    'Degree, minutes, and seconds precision',
    'Moon phases and void-of-course times',
    'Ingress dates and sign changes',
  ],
  dataManagementBadge: 'Data Management',
  dataManagementTitle: 'Organize Your Client Database',
  dataManagementDescription:
    "Store unlimited profiles with complete birth data, notes, and tags. Quick access to any client's charts and readings in seconds.",
  dataManagementItems: [
    'Complete birth data with location lookup',
    'Rodden rating for data accuracy',
    'Tags and notes for organization',
    'Quick search and filter',
  ],
  aiInterpretationsBadge: 'AI Interpretations',
  aiInterpretationsTitle: 'Instant Insights, Powered by AI',
  aiInterpretationsDescription:
    'Get intelligent, context-aware interpretations for any chart. Rich formatted text with emojis, headings, and structured analysis delivered in real-time.',
  aiInterpretationsItems: [
    'Full chart analysis with key themes',
    'Structured sections with headings',
    'Real-time streaming text generation',
    'Works with all chart types',
  ],
  getStartedTitle: 'Get Started in Three Simple Steps',
  step1Title: 'Create Your Account',
  step1Desc: 'Sign up in seconds and set up your astrology preferences.',
  step2Title: 'Add Your Data',
  step2Desc: 'Enter birth data for yourself, friends, or clients.',
  step3Title: 'Generate & Interpret',
  step3Desc: 'Create charts, explore data, and get AI-powered insights.',
  ctaTitle: 'Ready to Discover Your Cosmic Identity?',
  ctaDescription:
    'Join thousands of astrology enthusiasts using JSTAR to calculate faster and communicate more clearly. Your journey into the stars starts here.',
  ctaButton: 'Start Your Free Trial',
  ctaNote: 'No credit card required - Free forever plan available',
  footerAbout: 'About',
  footerPrivacy: 'Privacy',
  footerTerms: 'Terms',
  footerAccessibility: 'Accessibility',
  footerCookies: 'Cookies',
  changePasswordTitle: 'Change Password',
  currentPassword: 'Current Password',
  enterCurrentPassword: 'Enter current password',
  newPassword: 'New Password',
  enterNewPassword: 'Enter new password',
  confirmPassword: 'Confirm New Password',
  confirmNewPassword: 'Confirm new password',
  passwordChangedSuccess: 'Password changed successfully!',
  passwordsDoNotMatch: 'New passwords do not match.',
  passwordTooShort: 'New password must be at least 6 characters.',
  changePasswordBtn: 'Change Password',
  changingPassword: 'Changing...',
  signIn: 'Sign In',
  signUp: 'Sign Up',
  welcomeBack: 'Welcome back, cosmic traveler',
  beginJourney: 'Begin your cosmic journey',
  fullName: 'Full Name',
  emailAddress: 'Email Address',
  password: 'Password',
  enterYourName: 'Enter your name',
  enterYourEmail: 'Enter your email',
  enterYourPassword: 'Enter your password',
  emailIsRequired: 'Email is required',
  validEmail: 'Please enter a valid email',
  passwordIsRequired: 'Password is required',
  passwordMinLength: 'Password must be at least 6 characters',
  nameIsRequired: 'Name is required',
  signingIn: 'Signing in...',
  createAccount: 'Create Account',
  orContinueWith: 'or continue with',
  forgotPassword: 'Forgot Password?',
  dontHaveAccount: "Don't have an account?",
  alreadyHaveAccount: 'Already have an account?',
  incorrectPassword: 'Incorrect password. Please try again.',
  noAccountFound: 'No account found with this email address.',
  loginFailed: 'Login failed. Please try again.',
};
