// LanguageSwitch Component - Dropdown to switch between languages
import { memo, useState } from "react";
import { useLanguage, type Language } from "../../contexts/LanguageContext";
import {
  LanguageSwitchWrapper,
  LanguageButton,
  LanguageDropdown,
  LanguageOption,
} from "./LanguageSwitch.styles";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
];

function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <LanguageSwitchWrapper>
      <LanguageButton onClick={() => setIsOpen(!isOpen)}>
        <span>{currentLang.flag}</span>
        <span>{currentLang.label}</span>
      </LanguageButton>

      {isOpen && (
        <LanguageDropdown>
          {languages.map((lang) => (
            <LanguageOption
              key={lang.code}
              $active={lang.code === language}
              onClick={() => handleSelect(lang.code)}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </LanguageOption>
          ))}
        </LanguageDropdown>
      )}
    </LanguageSwitchWrapper>
  );
}

export default memo(LanguageSwitch);

