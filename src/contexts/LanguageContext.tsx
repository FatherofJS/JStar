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

