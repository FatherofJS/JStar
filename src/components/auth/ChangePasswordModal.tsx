// Change Password Modal Component
import { useState, useCallback, type FormEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  SuccessMessage,
  PasswordForm,
  InputGroup,
  InputLabel,
  Input,
  ErrorMessage,
  SubmitButton,
} from "./ChangePasswordModal.styles";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const { changePassword } = useAuth();
  const { t } = useLanguage();
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when modal opens/closes
  const handleClose = useCallback(() => {
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setError(null);
    setSuccess(false);
    onClose();
  }, [onClose]);

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  }, []);

  // Handle form submit
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setError(null);

      // Validate
      if (!passwordForm.currentPassword) {
        setError(t.enterCurrentPassword);
        return;
      }
      if (!passwordForm.newPassword) {
        setError(t.enterNewPassword);
        return;
      }
      if (passwordForm.newPassword.length < 6) {
        setError(t.passwordTooShort);
        return;
      }
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setError(t.passwordsDoNotMatch);
        return;
      }

      setIsLoading(true);
      const result = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setIsLoading(false);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 1500);
      } else {
        setError(result.error || t.loginFailed);
      }
    },
    [passwordForm, changePassword, handleClose, t]
  );

  // Handle click outside to close
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  return (
    <ModalOverlay $open={isOpen} onClick={handleOverlayClick}>
      <ModalContainer $open={isOpen} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{t.changePasswordTitle}</ModalTitle>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </ModalHeader>

        {success ? (
          <SuccessMessage>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            {t.passwordChangedSuccess}
          </SuccessMessage>
        ) : (
          <PasswordForm onSubmit={handleSubmit}>
            <InputGroup>
              <InputLabel>{t.currentPassword}</InputLabel>
              <Input
                type="password"
                name="currentPassword"
                placeholder={t.enterCurrentPassword}
                value={passwordForm.currentPassword}
                onChange={handleInputChange}
                autoComplete="current-password"
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>{t.newPassword}</InputLabel>
              <Input
                type="password"
                name="newPassword"
                placeholder={t.enterNewPassword}
                value={passwordForm.newPassword}
                onChange={handleInputChange}
                autoComplete="new-password"
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>{t.confirmPassword}</InputLabel>
              <Input
                type="password"
                name="confirmPassword"
                placeholder={t.confirmNewPassword}
                value={passwordForm.confirmPassword}
                onChange={handleInputChange}
                autoComplete="new-password"
              />
            </InputGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? t.changingPassword : t.changePasswordBtn}
            </SubmitButton>
          </PasswordForm>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
}

