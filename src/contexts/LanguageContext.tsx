import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Translation types
export type Language = 'en' | 'vi' | 'ja';

export interface Translations {
  // Header
  account: string;
  changePassword: string;
  logout: string;
  login: string;
  home: string;
  features: string;
  pricing: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  getStarted: string;
  seeYourStar: string;
  scrollDown: string;
  
  // Features
  featuresTitle: string;
  featuresDescription: string;
  
  // Feature items - Interactive Charts
  interactiveChartsBadge: string;
  interactiveChartsTitle: string;
  interactiveChartsDescription: string;
  interactiveChartsItems: string[];
  
  // Feature items - Chart Data
  chartDataBadge: string;
  chartDataTitle: string;
  chartDataDescription: string;
  chartDataItems: string[];
  
  // Feature items - Transit Analysis
  transitAnalysisBadge: string;
  transitAnalysisTitle: string;
  transitAnalysisDescription: string;
  transitAnalysisItems: string[];
  
  // Feature items - Aspect Grid
  aspectGridBadge: string;
  aspectGridTitle: string;
  aspectGridDescription: string;
  aspectGridItems: string[];
  
  // Feature items - Transit Timeline
  transitTimelineBadge: string;
  transitTimelineTitle: string;
  transitTimelineDescription: string;
  transitTimelineItems: string[];
  
  // Feature items - Ephemeris
  ephemerisBadge: string;
  ephemerisTitle: string;
  ephemerisDescription: string;
  ephemerisItems: string[];
  
  // Feature items - Position Tables
  positionTablesBadge: string;
  positionTablesTitle: string;
  positionTablesDescription: string;
  positionTablesItems: string[];
  
  // Feature items - Data Management
  dataManagementBadge: string;
  dataManagementTitle: string;
  dataManagementDescription: string;
  dataManagementItems: string[];
  
  // Feature items - AI Interpretations
  aiInterpretationsBadge: string;
  aiInterpretationsTitle: string;
  aiInterpretationsDescription: string;
  aiInterpretationsItems: string[];
  
  // Pricing Section
  pricingTitle: string;
  pricingSubtitle: string;
  launchSpecial: string;
  proPlan: string;
  proPlanDesc: string;
  perMonth: string;
  launchDiscount: string;
  pricingFeature1: string;
  pricingFeature2: string;
  pricingFeature3: string;
  pricingFeature4: string;
  pricingFeature5: string;
  pricingFeature6: string;
  getStartedBtn: string;
  pricingNote: string;
  
  // Get Started Steps
  getStartedTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  
  // CTA Section
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
  ctaNote: string;
  
  // Footer
  footerAbout: string;
  footerPrivacy: string;
  footerTerms: string;
  footerAccessibility: string;
  footerCookies: string;
  
  // Change Password Modal
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
  
  // Auth Modal
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
  
  // Validation errors
  incorrectPassword: string;
  noAccountFound: string;
  loginFailed: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    account: 'Account',
    changePassword: 'Change Password',
    logout: 'Logout',
    login: 'Login',
    home: 'Home',
    features: 'Features',
    pricing: 'Pricing',
    
    // Hero Section
    heroTitle: 'JSTAR',
    heroSubtitle: 'KNOW YOUR STAR',
    heroDescription: 'Professional astrology software for accurate natal charts, transits, synastry, and AI-powered interpretations. Discover your cosmic identity.',
    getStarted: 'GET STARTED',
    seeYourStar: 'SEE YOUR STAR',
    scrollDown: 'Scroll to features',
    
    // Features - these are used as keys for dynamic content
    featuresTitle: 'Features',
    featuresDescription: 'Discover our powerful astrology tools',
    
    // Feature items - Interactive Charts
    interactiveChartsBadge: 'Interactive Charts',
    interactiveChartsTitle: 'Beautiful, Precise Astrology Charts',
    interactiveChartsDescription: 'High-precision SVG charts with interactive hover states, customizable themes, and detailed planetary positions. Every chart is calculated with astronomical accuracy.',
    interactiveChartsItems: [
      'Natal, Transits, Synastry, Composite charts',
      'Solar and Lunar Return charts',
      'Multiple house systems (Placidus, Whole Sign, Koch...)',
      'Tropical and Sidereal zodiac options',
    ],
    
    // Feature items - Chart Data
    chartDataBadge: 'Chart Data',
    chartDataTitle: 'Complete Chart Analysis',
    chartDataDescription: 'Every chart includes a comprehensive Data tab with all the details you need. Planetary positions, house placements, aspects, and element distributions at your fingertips.',
    chartDataItems: [
      'Chart highlights with key placements',
      'Lunar phase and aspect details',
      'Element and quality distribution charts',
      'Complete planetary positions table',
    ],
    
    // Feature items - Transit Analysis
    transitAnalysisBadge: 'Transit Analysis',
    transitAnalysisTitle: 'Real-Time Planetary Transits',
    transitAnalysisDescription: 'Overlay current planetary positions on any natal chart. Track how transiting planets interact with natal placements to understand timing and influences.',
    transitAnalysisItems: [
      'Dual-ring chart with natal and transit positions',
      'Aspect lines between transit and natal planets',
      'Customizable transit date selection',
      'Instant aspect calculations',
    ],
    
    // Feature items - Aspect Grid
    aspectGridBadge: 'Aspect Grid',
    aspectGridTitle: 'Complete Aspect Overview',
    aspectGridDescription: 'View all planetary aspects at a glance with our interactive aspect grid. Quickly identify harmonious and challenging configurations in any chart comparison.',
    aspectGridItems: [
      'Color-coded aspect types (conjunction, trine, square...)',
      'Orb values displayed for each aspect',
      'Filter by aspect type or planet',
      'Works with natal, transit, and synastry charts',
    ],
    
    // Feature items - Transit Timeline
    transitTimelineBadge: 'Transit Timeline',
    transitTimelineTitle: 'Track Upcoming Transits',
    transitTimelineDescription: 'See exactly when transits will be exact with the timeline view. Plan ahead with precise dates for applying and separating aspects.',
    transitTimelineItems: [
      'Chronological list of transit events',
      'Exact dates and times for aspect perfection',
      'Filter by planet, aspect type, or date range',
      'Retrograde and direct station markers',
    ],
    
    // Feature items - Ephemeris
    ephemerisBadge: 'Ephemeris & Tables',
    ephemerisTitle: 'Visual Planetary Ephemeris',
    ephemerisDescription: 'Explore planetary positions with both graphical and tabular views. Track planetary movements across the zodiac over any time period.',
    ephemerisItems: [
      'Graphical ephemeris chart with planetary tracks',
      'Detailed position tables by date',
      'Retrograde periods clearly highlighted',
      'Export data for research and reference',
    ],
    
    // Feature items - Position Tables
    positionTablesBadge: 'Position Tables',
    positionTablesTitle: 'Detailed Position Data',
    positionTablesDescription: 'Access precise planetary positions for any date range. Perfect for research, mundane astrology, and verifying chart calculations.',
    positionTablesItems: [
      'Daily positions for all planets',
      'Degree, minutes, and seconds precision',
      'Moon phases and void-of-course times',
      'Ingress dates and sign changes',
    ],
    
    // Feature items - Data Management
    dataManagementBadge: 'Data Management',
    dataManagementTitle: 'Organize Your Client Database',
    dataManagementDescription: 'Store unlimited profiles with complete birth data, notes, and tags. Quick access to any client\'s charts and readings in seconds.',
    dataManagementItems: [
      'Complete birth data with location lookup',
      'Rodden rating for data accuracy',
      'Tags and notes for organization',
      'Quick search and filter',
    ],
    
    // Feature items - AI Interpretations
    aiInterpretationsBadge: 'AI Interpretations',
    aiInterpretationsTitle: 'Instant Insights, Powered by AI',
    aiInterpretationsDescription: 'Get intelligent, context-aware interpretations for any chart. Rich formatted text with emojis, headings, and structured analysis delivered in real-time.',
    aiInterpretationsItems: [
      'Full chart analysis with key themes',
      'Structured sections with headings',
      'Real-time streaming text generation',
      'Works with all chart types',
    ],
    
    // Pricing Section
    pricingTitle: 'Simple, Transparent Pricing',
    pricingSubtitle: 'One plan, everything included. No hidden fees.',
    launchSpecial: 'Launch Special',
    proPlan: 'Pro Plan',
    proPlanDesc: 'Full access to JSTAR',
    perMonth: 'per month',
    launchDiscount: '50% off — Launch price!',
    pricingFeature1: 'Unlimited birth charts',
    pricingFeature2: 'All chart types (Transit, Synastry, Composite, Returns)',
    pricingFeature3: 'AI-powered interpretations',
    pricingFeature4: 'PDF export',
    pricingFeature5: 'Timeline analysis',
    pricingFeature6: 'Priority support',
    getStartedBtn: 'Get Started',
    pricingNote: '15-day free trial • Cancel anytime',
    
    // Get Started Steps
    getStartedTitle: 'Get Started in Three Simple Steps',
    step1Title: 'Create Your Account',
    step1Desc: 'Sign up in seconds and set up your astrology preferences.',
    step2Title: 'Add Your Data',
    step2Desc: 'Enter birth data for yourself, friends, or clients.',
    step3Title: 'Generate & Interpret',
    step3Desc: 'Create charts, explore data, and get AI-powered insights.',
    
    // CTA Section
    ctaTitle: 'Ready to Discover Your Cosmic Identity?',
    ctaDescription: 'Join thousands of astrology enthusiasts using JSTAR to calculate faster and communicate more clearly. Your journey into the stars starts here.',
    ctaButton: 'Start Your Free Trial',
    ctaNote: 'No credit card required • Free forever plan available',
    
    // Footer
    footerAbout: 'About',
    footerPrivacy: 'Privacy',
    footerTerms: 'Terms',
    footerAccessibility: 'Accessibility',
    footerCookies: 'Cookies',
    
    // Change Password Modal
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
    
    // Auth Modal
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
    
    // Validation errors
    incorrectPassword: 'Incorrect password. Please try again.',
    noAccountFound: 'No account found with this email address.',
    loginFailed: 'Login failed. Please try again.',
  },
  
  vi: {
    // Header
    account: 'Tài khoản',
    changePassword: 'Đổi mật khẩu',
    logout: 'Đăng xuất',
    login: 'Đăng nhập',
    home: 'Trang chủ',
    features: 'Tính năng',
    pricing: 'Bảng giá',
    
    // Hero Section
    heroTitle: 'JSTAR',
    heroSubtitle: 'BIẾT NGÔI SAO CỦA BẠN',
    heroDescription: 'Phần mềm chiêm tinh chuyên nghiệp cho bản đồ sinh, sao chuyển, synastry và diễn giải AI. Khám phá bản sắc vũ trụ của bạn.',
    getStarted: 'BẮT ĐẦU',
    seeYourStar: 'XEM NGÔI SAO CỦA BẠN',
    scrollDown: 'Cuộn xuống tính năng',
    
    // Features
    featuresTitle: 'Tính năng',
    featuresDescription: 'Khám phá các công cụ chiêm tinh mạnh mẽ của chúng tôi',
    
    // Feature items - Interactive Charts
    interactiveChartsBadge: 'Biểu đồ Tương tác',
    interactiveChartsTitle: 'Biểu đồ Chiêm tinh Đẹp, Chính xác',
    interactiveChartsDescription: 'Biểu đồ SVG độ chính xác cao với trạng thái di chuột tương tác, chủ đề tùy chỉnh và vị trí hành tinh chi tiết. Mỗi biểu đồ được tính toán với độ chính xác thiên văn.',
    interactiveChartsItems: [
      'Bản đồ sinh, Sao chuyển, Synastry, Hợp nhất',
      'Bản đồ Mặt trời và Mặt trăng trả về',
      'Nhiều hệ thống nhà (Placidus, Whole Sign, Koch...)',
      'Tùy chọn hoàng đạo Nhiệt đới và Nghiệm lý',
    ],
    
    // Feature items - Chart Data
    chartDataBadge: 'Dữ liệu Biểu đồ',
    chartDataTitle: 'Phân tích Biểu đồ Hoàn chỉnh',
    chartDataDescription: 'Mỗi biểu đồ bao gồm tab Dữ liệu toàn diện với tất cả thông tin bạn cần. Vị trí hành tinh, vị trí nhà, khía cạnh và phân bố nguyên tố trong tầm tay.',
    chartDataItems: [
      'Điểm nổi bật của biểu đồ với các vị trí chính',
      'Chi tiết pha Mặt trăng và khía cạnh',
      'Biểu đồ phân bố nguyên tố và chất lượng',
      'Bảng vị trí hành tinh hoàn chỉnh',
    ],
    
    // Feature items - Transit Analysis
    transitAnalysisBadge: 'Phân tích Sao chuyển',
    transitAnalysisTitle: 'Sao chuyển Hành tinh Thời gian thực',
    transitAnalysisDescription: 'Phủ vị trí hành tinh hiện tại lên bất kỳ biểu đồ sinh nào. Theo dõi cách các hành tinh chuyển động tương tác với vị trí sinh để hiểu thời điểm và ảnh hưởng.',
    transitAnalysisItems: [
      'Biểu đồ hai vòng với vị trí sinh và chuyển động',
      'Đường khía cạnh giữa hành tinh chuyển và sinh',
      'Tùy chọn ngày chuyển động tùy chỉnh',
      'Tính toán khía cạnh tức thì',
    ],
    
    // Feature items - Aspect Grid
    aspectGridBadge: 'Lưới Khía cạnh',
    aspectGridTitle: 'Tổng quan Khía cạnh Hoàn chỉnh',
    aspectGridDescription: 'Xem tất cả các khía cạnh hành tinh cùng lúc với lưới khía cạnh tương tác của chúng tôi. Nhanh chóng xác định các cấu hình hài hòa và thách thức trong bất kỳ so sánh biểu đồ nào.',
    aspectGridItems: [
      'Các loại khía cạnh được mã hóa màu (hội tụ, tam hợp, vuông góc...)',
      'Giá trị orb hiển thị cho mỗi khía cạnh',
      'Lọc theo loại khía cạnh hoặc hành tinh',
      'Hoạt động với biểu đồ sinh, chuyển và synastry',
    ],
    
    // Feature items - Transit Timeline
    transitTimelineBadge: 'Dòng thời gian Sao chuyển',
    transitTimelineTitle: 'Theo dõi Sao chuyển Sắp tới',
    transitTimelineDescription: 'Xem chính xác khi nào sao chuyển sẽ chính xác với chế độ xem dòng thời gian. Lập kế hoạch trước với ngày chính xác cho các khía cạnh áp dụng và tách.',
    transitTimelineItems: [
      'Danh sách sự kiện sao chuyển theo thứ tự thời gian',
      'Ngày và giờ chính xác cho sự hoàn hảo của khía cạnh',
      'Lọc theo hành tinh, loại khía cạnh hoặc phạm vi ngày',
      'Đánh dấu điểm nghịch thuận và thuận',
    ],
    
    // Feature items - Ephemeris
    ephemerisBadge: 'Ephemeris & Bảng',
    ephemerisTitle: 'Ephemeris Hành tinh Trực quan',
    ephemerisDescription: 'Khám phá vị trí hành tinh với cả chế độ xem đồ họa và bảng. Theo dõi chuyển động hành tinh qua hoàng đạo trong bất kỳ khoảng thời gian nào.',
    ephemerisItems: [
      'Biểu đồ ephemeris đồ họa với quỹ đạo hành tinh',
      'Bảng vị trí chi tiết theo ngày',
      'Giai đoạn nghịch thuật được đánh dấu rõ ràng',
      'Xuất dữ liệu để nghiên cứu và tham khảo',
    ],
    
    // Feature items - Position Tables
    positionTablesBadge: 'Bảng Vị trí',
    positionTablesTitle: 'Dữ liệu Vị trí Chi tiết',
    positionTablesDescription: 'Truy cập vị trí hành tinh chính xác cho bất kỳ phạm vi ngày nào. Hoàn hảo cho nghiên cứu, chiêm tinh đại chúng và xác minh tính toán biểu đồ.',
    positionTablesItems: [
      'Vị trí hàng ngày cho tất cả hành tinh',
      'Độ, phút và giây chính xác',
      'Pha Mặt trăng và thời điểm void-of-course',
      'Ngày nhập và thay đổi cung',
    ],
    
    // Feature items - Data Management
    dataManagementBadge: 'Quản lý Dữ liệu',
    dataManagementTitle: 'Tổ chức Cơ sở dữ liệu Khách hàng',
    dataManagementDescription: 'Lưu trữ hồ sơ không giới hạn với dữ liệu sinh đầy đủ, ghi chú và thẻ. Truy cập nhanh vào biểu đồ và lời giải của bất kỳ khách hàng nào trong vài giây.',
    dataManagementItems: [
      'Dữ liệu sinh đầy đủ với tra cứu địa điểm',
      'Xếp hạng Rodden cho độ chính xác dữ liệu',
      'Thẻ và ghi chú để tổ chức',
      'Tìm kiếm và lọc nhanh',
    ],
    
    // Feature items - AI Interpretations
    aiInterpretationsBadge: 'Diễn giải AI',
    aiInterpretationsTitle: 'Thông tin tức thì, Công nghệ AI',
    aiInterpretationsDescription: 'Nhận diễn giải thông minh, nhận biết ngữ cảnh cho bất kỳ biểu đồ nào. Văn bản được định dạng phong phú với emoji, tiêu đề và phân tích cấu trúc được cung cấp theo thời gian thực.',
    aiInterpretationsItems: [
      'Phân tích biểu đồ đầy đủ với các chủ đề chính',
      'Các phần được cấu trúc với tiêu đề',
      'Tạo văn bản streaming thời gian thực',
      'Hoạt động với tất cả các loại biểu đồ',
    ],
    
    // Pricing Section
    pricingTitle: 'Giá cả Đơn giản, Minh bạch',
    pricingSubtitle: 'Một kế hoạch, tất cả bao gồm. Không phí ẩn.',
    launchSpecial: 'Khởi động đặc biệt',
    proPlan: 'Gói Pro',
    proPlanDesc: 'Toàn quyền truy cập JSTAR',
    perMonth: 'mỗi tháng',
    launchDiscount: 'Giảm 50% — Giá khởi động!',
    pricingFeature1: 'Không giới hạn bản đồ sinh',
    pricingFeature2: 'Tất cả các loại biểu đồ (Transit, Synastry, Hợp nhất, Trả về)',
    pricingFeature3: 'Diễn giải AI',
    pricingFeature4: 'Xuất PDF',
    pricingFeature5: 'Phân tích dòng thời gian',
    pricingFeature6: 'Hỗ trợ ưu tiên',
    getStartedBtn: 'Bắt đầu',
    pricingNote: 'Dùng thử 15 ngày • Hủy bất kỳ lúc nào',
    
    // Get Started Steps
    getStartedTitle: 'Bắt đầu trong Ba bước Đơn giản',
    step1Title: 'Tạo Tài khoản',
    step1Desc: 'Đăng ký trong vài giây và thiết lập sở thích chiêm tinh của bạn.',
    step2Title: 'Thêm Dữ liệu',
    step2Desc: 'Nhập dữ liệu sinh cho bạn, bạn bè hoặc khách hàng.',
    step3Title: 'Tạo & Diễn giải',
    step3Desc: 'Tạo biểu đồ, khám phá dữ liệu và nhận thông tin chiêm tinh AI.',
    
    // CTA Section
    ctaTitle: 'Sẵn sàng Khám phá Bản sắc Vũ trụ của Bạn?',
    ctaDescription: 'Tham gia cùng hàng nghìn người đam mê chiêm tinh sử dụng JSTAR để tính toán nhanh hơn và giao tiếp rõ ràng hơn. Hành trình của bạn vào các vì sao bắt đầu tại đây.',
    ctaButton: 'Bắt đầu Dùng thử Miễn phí',
    ctaNote: 'Không cần thẻ tín dụng • Có gói miễn phí vĩnh viễn',
    
    // Footer
    footerAbout: 'Giới thiệu',
    footerPrivacy: 'Quyền riêng tư',
    footerTerms: 'Điều khoản',
    footerAccessibility: 'Trợ năng',
    footerCookies: 'Cookies',
    
    // Change Password Modal
    changePasswordTitle: 'Đổi mật khẩu',
    currentPassword: 'Mật khẩu hiện tại',
    enterCurrentPassword: 'Nhập mật khẩu hiện tại',
    newPassword: 'Mật khẩu mới',
    enterNewPassword: 'Nhập mật khẩu mới',
    confirmPassword: 'Xác nhận mật khẩu mới',
    confirmNewPassword: 'Xác nhận mật khẩu mới',
    passwordChangedSuccess: 'Đổi mật khẩu thành công!',
    passwordsDoNotMatch: 'Mật khẩu mới không khớp.',
    passwordTooShort: 'Mật khẩu mới phải có ít nhất 6 ký tự.',
    changePasswordBtn: 'Đổi mật khẩu',
    changingPassword: 'Đang đổi...',
    
    // Auth Modal
    signIn: 'Đăng nhập',
    signUp: 'Đăng ký',
    welcomeBack: 'Chào mừng trở lại, nhà du hành vũ trụ',
    beginJourney: 'Bắt đầu hành trình vũ trụ của bạn',
    fullName: 'Họ và tên',
    emailAddress: 'Địa chỉ email',
    password: 'Mật khẩu',
    enterYourName: 'Nhập tên của bạn',
    enterYourEmail: 'Nhập email của bạn',
    enterYourPassword: 'Nhập mật khẩu của bạn',
    emailIsRequired: 'Email là bắt buộc',
    validEmail: 'Vui lòng nhập email hợp lệ',
    passwordIsRequired: 'Mật khẩu là bắt buộc',
    passwordMinLength: 'Mật khẩu phải có ít nhất 6 ký tự',
    nameIsRequired: 'Tên là bắt buộc',
    signingIn: 'Đang đăng nhập...',
    createAccount: 'Tạo tài khoản',
    orContinueWith: 'hoặc tiếp tục với',
    forgotPassword: 'Quên mật khẩu?',
    dontHaveAccount: 'Chưa có tài khoản?',
    alreadyHaveAccount: 'Đã có tài khoản?',
    
    // Validation errors
    incorrectPassword: 'Mật khẩu không đúng. Vui lòng thử lại.',
    noAccountFound: 'Không tìm thấy tài khoản với địa chỉ email này.',
    loginFailed: 'Đăng nhập thất bại. Vui lòng thử lại.',
  },
  
  ja: {
    // Header
    account: 'アカウント',
    changePassword: 'パスワード変更',
    logout: 'ログアウト',
    login: 'ログイン',
    home: 'ホーム',
    features: '機能',
    pricing: '料金',
    
    // Hero Section
    heroTitle: 'JSTAR',
    heroSubtitle: '自分を知る',
    heroDescription: '正確なホロスコープ、トランジット、シンアストリー、AI解釈のためのプロフェッショナルな占星術ソフトウェア。宇宙のアイデンティティを発見しましょう。',
    getStarted: '始める',
    seeYourStar: '自分を見る',
    scrollDown: '機能までスクロール',
    
    // Features
    featuresTitle: '機能',
    featuresDescription: '強力な占星術ツールを発見',
    
    // Feature items - Interactive Charts
    interactiveChartsBadge: 'インタラクティブチャート',
    interactiveChartsTitle: '美丽で正確な占星術チャート',
    interactiveChartsDescription: 'インタラクティブなホバー状態、カスタマイズ可能なテーマ、詳細な惑星位置を備えた高精度SVGチャート。すべてのチャートは天文学的な精度で計算されています。',
    interactiveChartsItems: [
      ' natal, トランジット, シンアストリー, コンポジットチャート',
      '太陽・月帰還チャート',
      '複数のハウスシステム（プラキディウス、ホールサイン、コッホ...）',
      '热带・sidereal占星術オプション',
    ],
    
    // Feature items - Chart Data
    chartDataBadge: 'チャートデータ',
    chartDataTitle: '完全なチャート分析',
    chartDataDescription: '各チャートには、必要なすべての詳細を備えた包括的なデータタブが含まれています。惑星位置、ハウス配置、アスペクト、元素分布を手の届き处に。',
    chartDataItems: [
      '重要な配置を持つチャートのハイライト',
      '月相とアスペクトの詳細',
      '元素と каче分布チャート',
      '完全な惑星位置テーブル',
    ],
    
    // Feature items - Transit Analysis
    transitAnalysisBadge: 'トランジット分析',
    transitAnalysisTitle: 'リアルタイム惑星トランジット',
    transitAnalysisDescription: ' natalチャートに現在の惑星位置をオーバーレイ。通過する惑星が natal 配置とどのように相互作用するかを追跡して、タイミングと影響を理解します。',
    transitAnalysisItems: [
      ' natalとトランジット位置を持つDual-ringチャート',
      'トランジットと natal惑星間のアスペクトライン',
      'カスタマイズ可能なトランジット日選択',
      'インスタントアスペクト計算',
    ],
    
    // Feature items - Aspect Grid
    aspectGridBadge: 'アスペクトグリッド',
    aspectGridTitle: '完全なアスペクト概要',
    aspectGridDescription: 'インタラクティブなアスペクトグリッドで、すべての惑星アспек트를一目で表示。任意のチャート比較で調和的かつ挑戦的な構成を素早く特定。',
    aspectGridItems: [
      'カラーコード化されたアスペクトタイプ（コンジャンクション、トライン、スケア...）',
      '各アスペクトに表示されるオーブ値',
      'アスペクトタイプまたは惑星でフィルタ',
      ' natal, トランジット, シンアストリーチャートで動作',
    ],
    
    // Feature items - Transit Timeline
    transitTimelineBadge: 'トランジットタイムライン',
    transitTimelineTitle: '今後のトランジットを追跡',
    transitTimelineDescription: 'タイムラインビューでトランジットが正確になるときを正確に確認。適用および分離アspectの正確な日付で事前に計画。',
    transitTimelineItems: [
      'トランジットイベントの年代順リスト',
      'アスペクト完成の正確な日時',
      '惑星、アスペクトタイプ、日付範囲でフィルタ',
      '逆行と直接ステーションのマーカー',
    ],
    
    // Feature items - Ephemeris
    ephemerisBadge: 'エフェメリス＆テーブル',
    ephemerisTitle: 'ビジュアル惑星エフェメリス',
    ephemerisDescription: 'グラフィカルおよびテーブルビューで惑星位置を探索。任意の期間にわたって黄道帯全体の惑星移動を追跡。',
    ephemerisItems: [
      '惑星軌道を持つグラフィカルエフェメリスチャート',
      '日付別詳細位置テーブル',
      '逆行期間が明確にハイライト',
      '研究と参照のためのデータエクスポート',
    ],
    
    // Feature items - Position Tables
    positionTablesBadge: '位置テーブル',
    positionTablesTitle: '詳細な位置データ',
    positionTablesDescription: '任意の日付範囲の正確な惑星位置にアクセス。研究、mundane占星術、チャート計算の検証に最適。',
    positionTablesItems: [
      'すべての惑星の日次位置',
      '度、分、秒の精度',
      '月相とボイド・オブ・コーズの時間',
      'イングレス日付とサイン変更',
    ],
    
    // Feature items - Data Management
    dataManagementBadge: 'データ管理',
    dataManagementTitle: 'クライアントデータベースを整理',
    dataManagementDescription: '完全な出生データ、メモ、タグを持つ無制限のプロフィールを保存。 数秒で任意のクライアントのチャートとリーディングにクイックアクセス。',
    dataManagementItems: [
      '場所検索を含む完全な出生データ',
      'データ精度のためのロッデン評価',
      '整理のためのタグとメモ',
      'クイック検索とフィルタ',
    ],
    
    // Feature items - AI Interpretations
    aiInterpretationsBadge: 'AI解釈',
    aiInterpretationsTitle: 'AIパワードインサイト',
    aiInterpretationsDescription: '任意のチャートにIntelligent、コンテキスト認識の解釈を取得。絵文字、見出し、構造化された分析を備えたリッチなフォーマットテキストがリアルタイムで提供。',
    aiInterpretationsItems: [
      '主要なテーマを持つ完全なチャート分析',
      '見出しを持つ構造化されたセクション',
      'リアルタイムストリーミングテキスト生成',
      'すべてのチャートタイプで動作',
    ],
    
    // Pricing Section
    pricingTitle: 'シンプルで透明性の高い料金設定',
    pricingSubtitle: '一つのプランですべて込み。隠れた手数料はありません。',
    launchSpecial: 'ローンチ特別',
    proPlan: 'プロプラン',
    proPlanDesc: 'JSTAR完全アクセス',
    perMonth: '月額',
    launchDiscount: '50%オフ — ローンチ価格！',
    pricingFeature1: '無制限の出生チャート',
    pricingFeature2: 'すべてのチャートタイプ（トランジット、シンアストリー、コンポジット、リターン）',
    pricingFeature3: 'AIパワード解釈',
    pricingFeature4: 'PDFエクスポート',
    pricingFeature5: 'タイムライン分析',
    pricingFeature6: '優先サポート',
    getStartedBtn: '始める',
    pricingNote: '15日間無料試用 • いつでもキャンセル可能',
    
    // Get Started Steps
    getStartedTitle: '3つの簡単なステップで始める',
    step1Title: 'アカウント作成',
    step1Desc: '数秒でサインアップして占星術の設定を行う。',
    step2Title: 'データを追加',
    step2Desc: '自分、家族、客户の出生データを入力。',
    step3Title: '生成と解釈',
    step3Desc: 'チャートを作成し、データを探索し、AIパワードの洞察を得る。',
    
    // CTA Section
    ctaTitle: '宇宙のアイデンティティを発見する準備はできましたか？',
    ctaDescription: 'JSTARを使用してより速く計算し、より明確にコミュニケーションを取る何千人もの占星術愛好家に参加しましょう。星への旅が始まります。',
    ctaButton: '無料試用を開始',
    ctaNote: 'クレジットカード不要 • 免费永久プランあり',
    
    // Footer
    footerAbout: 'について',
    footerPrivacy: 'プライバシー',
    footerTerms: '利用規約',
    footerAccessibility: 'アクセシビリティ',
    footerCookies: 'クッキー',
    
    // Change Password Modal
    changePasswordTitle: 'パスワード変更',
    currentPassword: '現在のパスワード',
    enterCurrentPassword: '現在のパスワードを入力',
    newPassword: '新しいパスワード',
    enterNewPassword: '新しいパスワードを入力',
    confirmPassword: '新しいパスワードを確認',
    confirmNewPassword: '新しいパスワードを確認',
    passwordChangedSuccess: 'パスワードが正常に変更されました！',
    passwordsDoNotMatch: '新しいパスワードが一致しません。',
    passwordTooShort: '新しいパスワードは6文字以上必要です。',
    changePasswordBtn: 'パスワード変更',
    changingPassword: '変更中...',
    
    // Auth Modal
    signIn: 'サインイン',
    signUp: 'サインアップ',
    welcomeBack: 'おかえりなさい、宇宙旅行者',
    beginJourney: '宇宙の旅を始めましょう',
    fullName: '氏名',
    emailAddress: 'メールアドレス',
    password: 'パスワード',
    enterYourName: '名前を入力',
    enterYourEmail: 'メールアドレスを入力',
    enterYourPassword: 'パスワードを入力',
    emailIsRequired: 'メールアドレスは必須です',
    validEmail: '有効なメールアドレスを入力してください',
    passwordIsRequired: 'パスワードは必須です',
    passwordMinLength: 'パスワードは6文字以上必要です',
    nameIsRequired: '氏名は必須です',
    signingIn: 'サインイン中...',
    createAccount: 'アカウント作成',
    orContinueWith: 'またはで続行',
    forgotPassword: 'パスワードをお忘れですか？',
    dontHaveAccount: 'アカウントをお持ちでないですか？',
    alreadyHaveAccount: 'すでにアカウントをお持ちですか？',
    
    // Validation errors
    incorrectPassword: 'パスワードが正しくありません。もう一度お試しください。',
    noAccountFound: 'このメールアドレスのアカウントは見つかりません。',
    loginFailed: 'ログインに失敗しました。もう一度お試しください。',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'jstar-language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'vi' || stored === 'ja') {
      return stored;
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

