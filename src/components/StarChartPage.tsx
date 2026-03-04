// StarChartPage Component - Personalized astrology chart page
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Background } from "./background/Background";
import Layout from "./Layout";
import { LocationAutocomplete } from "./LocationAutocomplete";
import type { LocationData } from "../types/location";
import { useTheme } from "../contexts/ThemeContext";

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
`;

const StarDecoration = styled.div<{ $top: string; $left: string; $size: number; $delay: string }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%);
  border-radius: 50%;
  animation: ${twinkle} 3s ease-in-out infinite;
  animation-delay: ${props => props.$delay};
  pointer-events: none;
  z-index: 0;
`;

const PageTitle = styled.h1<{ $isLight: boolean }>`
  font-size: clamp(36px, 6vw, 56px);
  font-weight: 800;
  margin-bottom: 8px;
  background: linear-gradient(90deg, 
    ${props => props.$isLight ? '#1e293b 0%' : '#fff 0%'}, 
    ${props => props.$isLight ? '#4f46e5 25%' : '#c4b5fd 25%'}, 
    ${props => props.$isLight ? '#7c3aed 50%' : '#818cf8 50%'}, 
    ${props => props.$isLight ? '#4f46e5 75%' : '#c4b5fd 75%'}, 
    ${props => props.$isLight ? '#1e293b 100%' : '#fff 100%'}
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;
  animation: ${shimmer} 4s linear infinite;
  letter-spacing: -1px;
  text-shadow: ${props => props.$isLight
    ? '0 0 40px rgba(99, 102, 241, 0.15)'
    : '0 0 40px rgba(129, 140, 248, 0.3)'};
  
  @media (max-width: 768px) {
    letter-spacing: 0;
  }
`;

const WelcomeText = styled.p<{ $isLight: boolean }>`
  font-size: 18px;
  color: ${props => props.$isLight ? 'var(--text-secondary)' : 'rgba(255, 255, 255, 0.7)'};
  margin-bottom: 40px;
  text-align: center;
  max-width: 500px;
  line-height: 1.6;
  opacity: 0.9;
`;

const ChartContainer = styled.div<{ $isLight: boolean }>`
  width: 100%;
  max-width: 700px;
  background: ${props => props.$isLight
    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)'};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.$isLight
    ? 'rgba(0, 0, 0, 0.08)'
    : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 32px;
  padding: 40px;
  box-shadow: ${props => props.$isLight
    ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
    : '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'};
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 28px 20px;
    border-radius: 24px;
  }
`;

const FormSection = styled.div`
  margin-bottom: 28px;
  position: relative;
`;

const SectionDivider = styled.div<{ $isLight: boolean }>`
  height: 1px;
  background: linear-gradient(90deg, transparent, ${props => props.$isLight
    ? 'rgba(0, 0, 0, 0.1)'
    : 'rgba(255,255,255,0.1)'}, transparent);
  margin: 8px 0 28px;
`;

const FormLabel = styled.label<{ $isLight: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.$isLight
    ? 'rgba(30, 41, 59, 0.7)'
    : 'rgba(255, 255, 255, 0.7)'};
  margin-bottom: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  
  &::before {
    content: '✦';
    color: ${props => props.$isLight ? '#4f46e5' : '#818cf8'};
    font-size: 8px;
  }
`;

const InputIcon = styled.span`
  font-size: 16px;
  margin-right: 8px;
`;

const DatePickerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 12px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const DateSelect = styled.select<{ $isLight: boolean }>`
  width: 100%;
  padding: 16px 18px;
  border-radius: 16px;
  border: 1px solid ${props => props.$isLight
    ? 'rgba(0, 0, 0, 0.1)'
    : 'rgba(255, 255, 255, 0.08)'};
  background: ${props => props.$isLight
    ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)'};
  color: ${props => props.$isLight ? '#1e293b' : '#fff'};
  font-size: 15px;
  font-weight: 500;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='${props => props.$isLight ? '%234f46e5' : '%23818cf8'}' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 18px center;
  padding-right: 45px;
  
  &:hover {
    border-color: ${props => props.$isLight
    ? 'rgba(79, 70, 229, 0.4)'
    : 'rgba(129, 140, 248, 0.4)'};
    background: ${props => props.$isLight
    ? 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%)'};
  }
  
  &:focus {
    border-color: ${props => props.$isLight ? '#4f46e5' : '#818cf8'};
    box-shadow: ${props => props.$isLight
    ? '0 0 0 4px rgba(79, 70, 229, 0.15), 0 8px 32px rgba(79, 70, 229, 0.2)'
    : '0 0 0 4px rgba(129, 140, 248, 0.15), 0 8px 32px rgba(129, 140, 248, 0.2)'};
    transform: translateY(-2px);
  }
  
  option {
    background: ${props => props.$isLight ? '#ffffff' : '#1e1b4b'};
    color: ${props => props.$isLight ? '#1e293b' : '#fff'};
    padding: 16px;
    font-size: 15px;
  }
  
  &:invalid, &:hover:invalid {
    color: ${props => props.$isLight
    ? 'rgba(30, 41, 59, 0.4)'
    : 'rgba(255, 255, 255, 0.4)'};
  }
`;

const DateInput = styled.input<{ $isLight: boolean }>`
  width: 100%;
  padding: 16px 18px;
  border-radius: 16px;
  border: 1px solid ${props => props.$isLight
    ? 'rgba(0, 0, 0, 0.1)'
    : 'rgba(255, 255, 255, 0.08)'};
  background: ${props => props.$isLight
    ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)'};
  color: ${props => props.$isLight ? '#1e293b' : '#fff'};
  font-size: 15px;
  font-weight: 500;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    border-color: ${props => props.$isLight
    ? 'rgba(79, 70, 229, 0.4)'
    : 'rgba(129, 140, 248, 0.4)'};
    background: ${props => props.$isLight
    ? 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%)'};
  }
  
  &:focus {
    border-color: ${props => props.$isLight ? '#4f46e5' : '#818cf8'};
    box-shadow: ${props => props.$isLight
    ? '0 0 0 4px rgba(79, 70, 229, 0.15), 0 8px 32px rgba(79, 70, 229, 0.2)'
    : '0 0 0 4px rgba(129, 140, 248, 0.15), 0 8px 32px rgba(129, 140, 248, 0.2)'};
    transform: translateY(-2px);
  }
  
  &::placeholder {
    color: ${props => props.$isLight
    ? 'rgba(30, 41, 59, 0.35)'
    : 'rgba(255, 255, 255, 0.35)'};
  }
  
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: ${props => props.$isLight ? 'none' : 'invert(1) brightness(0.8)'};
    transition: all 0.2s;
    
    &:hover {
      filter: ${props => props.$isLight ? 'brightness(0.8)' : 'invert(1) brightness(1.2)'};
    }
  }
  
  /* Remove number input arrows */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type=number] {
    appearance: textfield;
    -moz-appearance: textfield;
  }
`;

const FullNameInput = styled(DateInput)`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 18px 20px;
`;

const TimeWrapper = styled.div<{ $isLight: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  background: ${props => props.$isLight
    ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)'};
  border: 1px solid ${props => props.$isLight
    ? 'rgba(0, 0, 0, 0.1)'
    : 'rgba(255, 255, 255, 0.08)'};
  border-radius: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.$isLight
    ? 'rgba(79, 70, 229, 0.4)'
    : 'rgba(129, 140, 248, 0.4)'};
  }
  
  &:focus-within {
    border-color: ${props => props.$isLight ? '#4f46e5' : '#818cf8'};
    box-shadow: ${props => props.$isLight
    ? '0 0 0 4px rgba(79, 70, 229, 0.15)'
    : '0 0 0 4px rgba(129, 140, 248, 0.15)'};
  }
`;

const TimeInput = styled.input<{ $isLight: boolean }>`
  flex: 1;
  background: transparent;
  border: none;
  color: ${props => props.$isLight ? '#1e293b' : '#fff'};
  font-size: 15px;
  outline: none;
  
  &::placeholder {
    color: ${props => props.$isLight
    ? 'rgba(30, 41, 59, 0.35)'
    : 'rgba(255, 255, 255, 0.35)'};
  }
  
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: ${props => props.$isLight ? 'none' : 'invert(1) brightness(0.8)'};
  }
`;

const SubmitButton = styled.button<{ $isLight: boolean }>`
  width: 100%;
  padding: 20px 40px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
  background-size: 200% 200%;
  color: white;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  box-shadow: ${props => props.$isLight
    ? '0 10px 40px -10px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
    : '0 10px 40px -10px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)'};
  margin-top: 12px;
  
  &:hover {
    background-position: 100% 100%;
    transform: translateY(-3px);
    box-shadow: ${props => props.$isLight
    ? '0 20px 60px -10px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
    : '0 20px 60px -10px rgba(99, 102, 241, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)'};
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const ErrorMessage = styled.div<{ $isLight: boolean }>`
  color: ${props => props.$isLight ? '#dc2626' : '#fca5a5'};
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
  padding: 14px 20px;
  background: ${props => props.$isLight
    ? 'rgba(220, 38, 38, 0.08)'
    : 'rgba(239, 68, 68, 0.1)'};
  border: 1px solid ${props => props.$isLight
    ? 'rgba(220, 38, 38, 0.2)'
    : 'rgba(239, 68, 68, 0.2)'};
  border-radius: 12px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ResultSection = styled.div<{ $isLight: boolean }>`
  margin-top: 36px;
  text-align: center;
  padding: 36px;
  background: ${props => props.$isLight
    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.06) 100%)'
    : 'linear-gradient(135deg, rgba(129, 140, 248, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%)'};
  border-radius: 24px;
  border: 1px solid ${props => props.$isLight
    ? 'rgba(99, 102, 241, 0.15)'
    : 'rgba(129, 140, 248, 0.2)'};
  animation: ${fadeIn} 0.5s ease-out;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #818cf8, #a855f7, transparent);
  }
`;

const ZodiacIcon = styled.div<{ $isLight: boolean }>`
  font-size: 80px;
  margin-bottom: 16px;
  animation: ${float} 3s ease-in-out infinite;
  filter: drop-shadow(${props => props.$isLight
    ? '0 0 20px rgba(99, 102, 241, 0.3)'
    : '0 0 20px rgba(129, 140, 248, 0.5)'});
`;

const ZodiacName = styled.h2<{ $isLight: boolean }>`
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, ${props => props.$isLight ? '#1e293b 0%' : '#fff 0%'}, ${props => props.$isLight ? '#4f46e5 100%' : '#c4b5fd 100%'});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 8px;
`;

const ZodiacDescription = styled.p<{ $isLight: boolean }>`
  font-size: 16px;
  color: ${props => props.$isLight
    ? 'rgba(30, 41, 59, 0.7)'
    : 'rgba(255, 255, 255, 0.7)'};
  line-height: 1.7;
  max-width: 400px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const SubLabel = styled.div<{ $isLight: boolean }>`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.$isLight
    ? 'rgba(30, 41, 59, 0.5)'
    : 'rgba(255, 255, 255, 0.5)'};
  margin-bottom: 8px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const LocationResult = styled.div<{ $isLight: boolean }>`
  margin-top: 20px;
  padding: 16px;
  background: ${props => props.$isLight
    ? 'rgba(0, 0, 0, 0.02)'
    : 'rgba(255, 255, 255, 0.03)'};
  border-radius: 12px;
  border: 1px solid ${props => props.$isLight
    ? 'rgba(0, 0, 0, 0.05)'
    : 'rgba(255, 255, 255, 0.05)'};
`;

const LocationText = styled.p<{ $isLight: boolean }>`
  font-size: 14px;
  color: ${props => props.$isLight
    ? 'rgba(30, 41, 59, 0.6)'
    : 'rgba(255, 255, 255, 0.6)'};
  line-height: 1.8;
  
  span {
    color: ${props => props.$isLight ? '#4f46e5' : '#818cf8'};
    font-weight: 500;
  }
`;

export default function StarChartPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [selectedCity, setSelectedCity] = useState<LocationData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<LocationData | null>(null);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{
    zodiac: string;
    icon: string;
    description: string;
  } | null>(null);

  const getZodiacSign = useCallback((birthMonth: string, birthDay: string) => {
    const month = parseInt(birthMonth);
    const day = parseInt(birthDay);

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { zodiac: 'Aries', icon: '♈', description: 'The Ram - Bold, ambitious, and energetic. Aries leads with courage and determination.' };
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { zodiac: 'Taurus', icon: '♉', description: 'The Bull - Reliable, patient, and practical. Taurus values stability and security.' };
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { zodiac: 'Gemini', icon: '♊', description: 'The Twins - Adaptable, curious, and communicative. Gemini loves variety and new experiences.' };
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { zodiac: 'Cancer', icon: '♋', description: 'The Crab - Emotional, intuitive, and protective. Cancer values home and family deeply.' };
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { zodiac: 'Leo', icon: '♌', description: 'The Lion - Confident, creative, and generous. Leo loves to be the center of attention.' };
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { zodiac: 'Virgo', icon: '♍', description: 'The Maiden - Practical, analytical, and helpful. Virgo strives for perfection.' };
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { zodiac: 'Libra', icon: '♎', description: 'The Scales - Peaceful, fair, and diplomatic. Libra seeks harmony in all things.' };
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { zodiac: 'Scorpio', icon: '♏', description: 'The Scorpion - Passionate, resourceful, and determined. Scorpio is intense and transformative.' };
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { zodiac: 'Sagittarius', icon: '♐', description: 'The Archer - Optimistic, adventurous, and honest. Sagittarius loves freedom and exploration.' };
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { zodiac: 'Capricorn', icon: '♑', description: 'The Goat - Disciplined, responsible, and ambitious. Capricorn values achievement and status.' };
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { zodiac: 'Aquarius', icon: '♒', description: 'The Water Bearer - Independent, original, and humanitarian. Aquarius thinks outside the box.' };
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return { zodiac: 'Pisces', icon: '♓', description: 'The Fish - Compassionate, artistic, and intuitive. Pisces is dreamy and sensitive.' };
    return null;
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!day || !month || !year) {
      setError('Please select your date of birth.');
      return;
    }

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (dayNum < 1 || dayNum > 31) {
      setError('Please enter a valid day (1-31).');
      return;
    }

    if (monthNum < 1 || monthNum > 12) {
      setError('Please enter a valid month (1-12).');
      return;
    }

    if (yearNum < 1900 || yearNum > new Date().getFullYear()) {
      setError('Please enter a valid year.');
      return;
    }

    if (!selectedCity) {
      setError('Please select a birth city.');
      return;
    }

    const dateStr = `${yearNum}-${String(monthNum).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    const timeStr = birthTime || '12:00';

    navigate('/chart', {
      state: {
        name: fullName.trim(),
        birthDate: dateStr,
        birthTime: timeStr,
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
        timezone: selectedCity.timezone || 'UTC',
      }
    });
  }, [fullName, day, month, year, birthTime, selectedCity, navigate]);

  return (
    <Layout>
      <Background showShootingStars={false} />
      <PageWrapper>
        {/* Decorative stars - only show in dark mode */}
        {!isLight && (
          <>
            <StarDecoration $top="10%" $left="10%" $size={3} $delay="0s" />
            <StarDecoration $top="20%" $left="85%" $size={2} $delay="0.5s" />
            <StarDecoration $top="60%" $left="5%" $size={2} $delay="1s" />
            <StarDecoration $top="70%" $left="90%" $size={3} $delay="1.5s" />
            <StarDecoration $top="40%" $left="95%" $size={2} $delay="2s" />
            <StarDecoration $top="80%" $left="15%" $size={2} $delay="0.3s" />
          </>
        )}

        <PageTitle $isLight={isLight}>Your Star</PageTitle>
        <WelcomeText $isLight={isLight}>
          Discover your cosmic identity. Enter your birth details and unlock the secrets of the stars.
        </WelcomeText>

        <ChartContainer $isLight={isLight}>
          <form onSubmit={handleSubmit}>
            <FormSection>
              <FormLabel $isLight={isLight}>Full Name</FormLabel>
              <FullNameInput
                type="text"
                placeholder="What should we call you?"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                $isLight={isLight}
                required
              />
            </FormSection>

            <SectionDivider $isLight={isLight} />

            <FormSection>
              <FormLabel $isLight={isLight}>Date of Birth</FormLabel>
              <DatePickerWrapper>
                <DateSelect
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  $isLight={isLight}
                  required
                >
                  <option value="">Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </DateSelect>
                <DateSelect
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  $isLight={isLight}
                  required
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </DateSelect>
                <DateInput
                  type="number"
                  placeholder="Year"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  $isLight={isLight}
                  required
                />
              </DatePickerWrapper>
            </FormSection>

            <FormSection>
              <FormLabel $isLight={isLight}>Birth Time</FormLabel>
              <TimeWrapper $isLight={isLight}>
                <InputIcon>🕐</InputIcon>
                <TimeInput
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  placeholder="What time were you born?"
                  $isLight={isLight}
                />
              </TimeWrapper>
            </FormSection>

            <FormSection>
              <FormLabel $isLight={isLight}>Birth Place</FormLabel>
              <Row>
                <div>
                  <SubLabel $isLight={isLight}>City</SubLabel>
                  <LocationAutocomplete
                    value={selectedCity?.display_name?.split(',')[0] || ''}
                    onChange={(location: LocationData | null) => {
                      setSelectedCity(location);
                      if (location && location.country) {
                        setSelectedCountry({
                          id: location.country_code,
                          name: location.country,
                          country_code: location.country_code,
                          country: location.country,
                          display_name: location.country,
                          latitude: location.latitude,
                          longitude: location.longitude
                        });
                      }
                    }}
                    placeholder="Search city..."
                    searchType="city"
                    isLight={isLight}
                  />
                </div>
                <div>
                  <SubLabel $isLight={isLight}>Country</SubLabel>
                  <LocationAutocomplete
                    value={selectedCountry?.name || ''}
                    onChange={(location: LocationData | null) => setSelectedCountry(location)}
                    placeholder="Search country..."
                    searchType="country"
                    isLight={isLight}
                  />
                </div>
              </Row>
            </FormSection>




            {error && <ErrorMessage $isLight={isLight}>{error}</ErrorMessage>}

            <SubmitButton type="submit" $isLight={isLight}>Reveal Your Star</SubmitButton>
          </form>

          {result && (
            <ResultSection $isLight={isLight}>
              <ZodiacIcon $isLight={isLight}>{result.icon}</ZodiacIcon>
              <ZodiacName $isLight={isLight}>{result.zodiac}</ZodiacName>
              <ZodiacDescription $isLight={isLight}>{result.description}</ZodiacDescription>
            </ResultSection>
          )}
        </ChartContainer>
      </PageWrapper>
    </Layout>
  );
}
