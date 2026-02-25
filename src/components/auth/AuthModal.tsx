// AuthModal Component - Premium login/register modal with cosmic theme
import { useState, useCallback, useEffect } from "react";
import {
  ModalOverlay,
  ModalContainer,
  CloseButton,
  ModalHeader,
  Logo,
  Subtitle,
  TabContainer,
  Tab,
  Form,
  InputGroup,
  InputLabel,
  Input,
  SubmitButton,
  Divider,
  SocialButtons,
  SocialButton,
  ErrorMessage,
  ForgotPassword,
  Footer,
  CosmicBackground,
  Star,
} from "./AuthModal.styles.ts";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "login" | "register";
  onLoginSuccess?: () => void;
}

// Generate random stars for cosmic background
const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
  }));
};

const stars = generateStars(8);

function getApiUrl() {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    return `${baseUrl}/api/auth`;
}

export default function AuthModal({ isOpen, onClose, initialTab = "login", onLoginSuccess }: AuthModalProps) {
  const { login } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"login" | "register">(initialTab);
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
  const [shake, setShake] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setFormData({ email: "", password: "", name: "" });
      setErrors({});
      setIsClosing(false);
      setApiError(null);
      setIsLoading(false);
    }
  }, [isOpen, initialTab]);

  // Handle close with animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 350);
  }, [onClose]);

  // Handle click outside modal
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  // Validate form
  const validate = useCallback(() => {
    const newErrors: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = t.emailIsRequired;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t.validEmail;
    }

    if (!formData.password) {
      newErrors.password = t.passwordIsRequired;
    } else if (formData.password.length < 6) {
      newErrors.password = t.passwordMinLength;
    }

    if (activeTab === "register" && !formData.name) {
      newErrors.name = t.nameIsRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, activeTab, t]);

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  // Handle register
  const handleRegister = async (name: string, email: string, password: string) => {
    const authApiUrl = getApiUrl();
    
    console.log('Register to:', `${authApiUrl}/register`);
    
    const response = await fetch(`${authApiUrl}/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, email: email, password: password})
    });
    
    return response;
  };

  // Handle form submit
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsLoading(true);
    setApiError(null);

    if (activeTab === "login") {
      // Handle login
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        handleClose();
        onLoginSuccess?.();
      } else {
        // Translate known error messages
        let translatedError = result.error;
        if (result.error === 'Incorrect password. Please try again.') {
          translatedError = t.incorrectPassword;
        } else if (result.error === 'No account found with this email address.') {
          translatedError = t.noAccountFound;
        }
        setApiError(translatedError || t.loginFailed);
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } else {
      // Handle registration - call API
      const response = await handleRegister(formData.name, formData.email, formData.password);
      
      if (response.ok) {
        // Registration successful, switch to login and auto-fill
        setApiError(null);
        switchTab("login");
        // Optionally show success message
      } else {
        let errorMessage = 'Registration failed';
        try {
          const errData = await response.json();
          errorMessage = errData.error || 'Registration failed';
        } catch {}
        setApiError(errorMessage);
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }

    setIsLoading(false);
  }, [formData, activeTab, validate, handleClose, login, onLoginSuccess, t]);

  // Switch tab
  const switchTab = useCallback((tab: "login" | "register") => {
    setActiveTab(tab);
    setErrors({});
    setApiError(null);
  }, []);

  if (!isOpen && !isClosing) return null;

  return (
    <ModalOverlay $isClosing={isClosing} onClick={handleOverlayClick}>
      <ModalContainer $isClosing={isClosing}>
        <CosmicBackground>
          {stars.map((star) => (
            <Star 
              key={star.id} 
              $top={star.top} 
              $left={star.left} 
              $size={star.size} 
            />
          ))}
        </CosmicBackground>
        
        <CloseButton onClick={handleClose}>×</CloseButton>

        <ModalHeader>
          <Logo>JSTAR</Logo>
          <Subtitle>
            {activeTab === "login" 
              ? t.welcomeBack
              : t.beginJourney}
          </Subtitle>
        </ModalHeader>

        <TabContainer>
          <Tab 
            $active={activeTab === "login"} 
            onClick={() => switchTab("login")}
          >
            {t.signIn}
          </Tab>
          <Tab 
            $active={activeTab === "register"} 
            onClick={() => switchTab("register")}
          >
            {t.signUp}
          </Tab>
        </TabContainer>

        <Form onSubmit={handleSubmit}>
          {activeTab === "register" && (
            <InputGroup>
              <InputLabel htmlFor="name">{t.fullName}</InputLabel>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder={t.enterYourName}
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <ErrorMessage $shake={shake}>{errors.name}</ErrorMessage>}
            </InputGroup>
          )}

          <InputGroup>
            <InputLabel htmlFor="email">{t.emailAddress}</InputLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder={t.enterYourEmail}
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
            />
            {errors.email && <ErrorMessage $shake={shake}>{errors.email}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="password">{t.password}</InputLabel>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder={t.enterYourPassword}
              value={formData.password}
              onChange={handleInputChange}
              autoComplete={activeTab === "login" ? "current-password" : "new-password"}
            />
            {errors.password && <ErrorMessage $shake={shake}>{errors.password}</ErrorMessage>}
            {apiError && (
              <ErrorMessage $shake={shake}>{apiError}</ErrorMessage>
            )}
          </InputGroup>

          {activeTab === "login" && (
            <ForgotPassword type="button">
              {t.forgotPassword}
            </ForgotPassword>
          )}

          <SubmitButton type="submit" disabled={isLoading}>
{isLoading ? (activeTab === "login" ? t.signingIn : t.signUp) : activeTab === "login" ? t.signIn : t.createAccount}
          </SubmitButton>

          <Divider>
            <span>{t.orContinueWith}</span>
          </Divider>

          <SocialButtons>
            <SocialButton type="button">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </SocialButton>
            <SocialButton type="button">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </SocialButton>
          </SocialButtons>
        </Form>

        <Footer>
          {activeTab === "login" ? (
            <>
              {t.dontHaveAccount} <a href="#" onClick={(e) => { e.preventDefault(); switchTab("register"); }}>{t.signUp}</a>
            </>
          ) : (
            <>
              {t.alreadyHaveAccount} <a href="#" onClick={(e) => { e.preventDefault(); switchTab("login"); }}>{t.signIn}</a>
            </>
          )}
        </Footer>
      </ModalContainer>
    </ModalOverlay>
  );
}
