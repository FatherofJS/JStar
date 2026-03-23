import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Background } from "../components/layout/Background";
import Layout from "../components/layout/Layout";
import { LocationAutocomplete } from "../components/forms/LocationAutocomplete";
import type { LocationData } from "../types/location";
import { useTheme } from "../theme";

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
  min-height: calc(100dvh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  position: relative;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 28px 14px 40px;
  }
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

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 28px;
  }
`;

const ChartContainer = styled.div<{ $isLight: boolean; $isSynastry?: boolean }>`
  width: 100%;
  max-width: ${props => props.$isSynastry ? '1100px' : '700px'};
  transition: max-width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
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

  @media (max-width: 480px) {
    padding: 22px 14px;
    border-radius: 20px;
  }
`;

const FormSection = styled.div`
  margin-bottom: 28px;
  position: relative;
`;

const FormGrid = styled.div<{ $isSynastry: boolean }>`
  display: ${props => props.$isSynastry ? 'grid' : 'block'};
  grid-template-columns: ${props => props.$isSynastry ? '1fr 1fr' : 'none'};
  gap: ${props => props.$isSynastry ? '48px' : '0'};
  transition: all 0.4s ease;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: ${props => props.$isSynastry ? '48px' : '0'};
  }
`;

const PersonColumn = styled.div`
  display: flex;
  flex-direction: column;
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
  grid-template-columns: minmax(0, 1.45fr) minmax(110px, 0.9fr) minmax(120px, 1fr);
  gap: 12px;
  align-items: stretch;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const DateSelect = styled.select<{ $isLight: boolean }>`
  width: 100%;
  min-height: 58px;
  box-sizing: border-box;
  display: block;
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
  line-height: 1.2;
  font-weight: 500;
  font-family: inherit;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='${props => props.$isLight ? '%234f46e5' : '%23818cf8'}' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 12px;
  padding-right: 42px;
  text-overflow: ellipsis;
  
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
  min-height: 58px;
  box-sizing: border-box;
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
  line-height: 1.2;
  font-weight: 500;
  font-family: inherit;
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

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 16px 18px;
  }
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

  @media (max-width: 480px) {
    padding: 16px 20px;
    font-size: 15px;
    letter-spacing: 1px;
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

const ToggleContainer = styled.div<{ $isLight: boolean }>`
  display: flex;
  background: ${props => props.$isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 20px;
  padding: 6px;
  margin-bottom: 32px;
  width: 100%;
  max-width: 440px;
  margin-left: auto;
  margin-right: auto;
`;

const ToggleButton = styled.button<{ $active: boolean; $isLight: boolean }>`
  flex: 1;
  padding: 12px 24px;
  border-radius: 14px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$active
    ? (props.$isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.15)')
    : 'transparent'};
  color: ${props => props.$active
    ? (props.$isLight ? '#4f46e5' : '#fff')
    : (props.$isLight ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.6)')};
  box-shadow: ${props => props.$active && props.$isLight
    ? '0 4px 12px rgba(0, 0, 0, 0.05)'
    : 'none'};
`;

const PersonTitle = styled.h3<{ $isLight: boolean }>`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.$isLight ? '#1e293b' : '#fff'};
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, ${props => props.$isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255,255,255,0.1)'}, transparent);
  }
  &::before {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(-90deg, ${props => props.$isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255,255,255,0.1)'}, transparent);
  }
`;


export default function StarChartPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const navigate = useNavigate();

  const [chartType, setChartType] = useState<'natal' | 'synastry'>('natal');

  const [fullName, setFullName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [selectedCity, setSelectedCity] = useState<LocationData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<LocationData | null>(null);

  const [p2FullName, setP2FullName] = useState('');
  const [p2Day, setP2Day] = useState('');
  const [p2Month, setP2Month] = useState('');
  const [p2Year, setP2Year] = useState('');
  const [p2BirthTime, setP2BirthTime] = useState('');
  const [p2SelectedCity, setP2SelectedCity] = useState<LocationData | null>(null);
  const [p2SelectedCountry, setP2SelectedCountry] = useState<LocationData | null>(null);

  const [error, setError] = useState('');
  const [result, setResult] = useState<{
    zodiac: string;
    icon: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('jstar_person1_autofill');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.fullName) setFullName(data.fullName);
        if (data.day) setDay(data.day);
        if (data.month) setMonth(data.month);
        if (data.year) setYear(data.year);
        if (data.birthTime) setBirthTime(data.birthTime);
        if (data.selectedCity) setSelectedCity(data.selectedCity);
        if (data.selectedCountry) setSelectedCountry(data.selectedCountry);
      }
    } catch (e) {
      console.error("Failed to load autofill data", e);
    }
  }, []);

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
      setError('Please enter Person 1 full name.');
      return;
    }
    if (!day || !month || !year) {
      setError('Please select Person 1 date of birth.');
      return;
    }
    if (!selectedCity) {
      setError('Please search and select a birth city from the dropdown for Person 1 (autofilled text doesn\'t count).');
      return;
    }

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900 || yearNum > new Date().getFullYear()) {
      setError('Please enter a valid date for Person 1.');
      return;
    }

    try {
      localStorage.setItem('jstar_person1_autofill', JSON.stringify({
        fullName: fullName.trim(),
        day, month, year, birthTime,
        selectedCity, selectedCountry
      }));
    } catch (e) {
      console.error("Failed to save autofill data", e);
    }

    if (chartType === 'synastry') {
      if (!p2FullName.trim()) {
        setError('Please enter Person 2 full name.');
        return;
      }
      if (!p2Day || !p2Month || !p2Year) {
        setError('Please select Person 2 date of birth.');
        return;
      }
      if (!p2SelectedCity) {
        setError('Please select a birth city for Person 2.');
        return;
      }
      const p2DayNum = parseInt(p2Day);
      const p2MonthNum = parseInt(p2Month);
      const p2YearNum = parseInt(p2Year);

      if (p2DayNum < 1 || p2DayNum > 31 || p2MonthNum < 1 || p2MonthNum > 12 || p2YearNum < 1900 || p2YearNum > new Date().getFullYear()) {
        setError('Please enter a valid date for Person 2.');
        return;
      }

      const p1DateStr = `${yearNum}-${String(monthNum).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      const p1TimeStr = birthTime || '12:00';
      const p2DateStr = `${p2YearNum}-${String(p2MonthNum).padStart(2, '0')}-${String(p2DayNum).padStart(2, '0')}`;
      const p2TimeStr = p2BirthTime || '12:00';

      navigate('/synastry', {
        state: {
          person1: {
            name: fullName.trim(),
            birthDate: p1DateStr,
            birthTime: p1TimeStr,
            latitude: selectedCity.latitude,
            longitude: selectedCity.longitude,
            timezone: selectedCity.timezone || 'UTC',
            city: selectedCity.display_name?.split(',')[0] || '',
            country: selectedCountry?.name || ''
          },
          person2: {
            name: p2FullName.trim(),
            birthDate: p2DateStr,
            birthTime: p2TimeStr,
            latitude: p2SelectedCity.latitude,
            longitude: p2SelectedCity.longitude,
            timezone: p2SelectedCity.timezone || 'UTC',
            city: p2SelectedCity.display_name?.split(',')[0] || '',
            country: p2SelectedCountry?.name || ''
          }
        }
      });
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
  }, [
    fullName, day, month, year, birthTime, selectedCity, selectedCountry,
    p2FullName, p2Day, p2Month, p2Year, p2BirthTime, p2SelectedCity, p2SelectedCountry,
    chartType, navigate
  ]);

  return (
    <Layout>
      <Background showShootingStars={false} />
      <PageWrapper>
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

        <ChartContainer $isLight={isLight} $isSynastry={chartType === 'synastry'}>
          <form onSubmit={handleSubmit}>
            <ToggleContainer $isLight={isLight}>
              <ToggleButton
                type="button"
                $active={chartType === 'natal'}
                $isLight={isLight}
                onClick={() => { setChartType('natal'); setError(''); }}
              >
                Natal Chart
              </ToggleButton>
              <ToggleButton
                type="button"
                $active={chartType === 'synastry'}
                $isLight={isLight}
                onClick={() => { setChartType('synastry'); setError(''); }}
              >
                Synastry Chart
              </ToggleButton>
            </ToggleContainer>

            <FormGrid $isSynastry={chartType === 'synastry'}>
              <PersonColumn>
                {chartType === 'synastry' && (
                  <PersonTitle $isLight={isLight}>Person 1</PersonTitle>
                )}

                <FormSection>
                  <FormLabel $isLight={isLight}>Full Name</FormLabel>
                  <FullNameInput
                    type="text"
                    name="name"
                    autoComplete="name"
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
                      name="bday-month"
                      autoComplete="bday-month"
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
                      name="bday-day"
                      autoComplete="bday-day"
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
                      name="bday-year"
                      autoComplete="bday-year"
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
                      name="bday-time"
                      autoComplete="bday-time"
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
              </PersonColumn>

              {chartType === 'synastry' && (
                <PersonColumn>
                  <PersonTitle $isLight={isLight}>Person 2</PersonTitle>

                  <FormSection>
                    <FormLabel $isLight={isLight}>Full Name</FormLabel>
                    <FullNameInput
                      type="text"
                      placeholder="Their name"
                      value={p2FullName}
                      onChange={(e) => setP2FullName(e.target.value)}
                      $isLight={isLight}
                      required={chartType === 'synastry'}
                    />
                  </FormSection>

                  <SectionDivider $isLight={isLight} />

                  <FormSection>
                    <FormLabel $isLight={isLight}>Date of Birth</FormLabel>
                    <DatePickerWrapper>
                      <DateSelect
                        value={p2Month}
                        onChange={(e) => setP2Month(e.target.value)}
                        $isLight={isLight}
                        required={chartType === 'synastry'}
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
                        value={p2Day}
                        onChange={(e) => setP2Day(e.target.value)}
                        $isLight={isLight}
                        required={chartType === 'synastry'}
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
                        value={p2Year}
                        onChange={(e) => setP2Year(e.target.value)}
                        $isLight={isLight}
                        required={chartType === 'synastry'}
                      />
                    </DatePickerWrapper>
                  </FormSection>

                  <FormSection>
                    <FormLabel $isLight={isLight}>Birth Time</FormLabel>
                    <TimeWrapper $isLight={isLight}>
                      <InputIcon>🕐</InputIcon>
                      <TimeInput
                        type="time"
                        value={p2BirthTime}
                        onChange={(e) => setP2BirthTime(e.target.value)}
                        placeholder="Time of birth?"
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
                          value={p2SelectedCity?.display_name?.split(',')[0] || ''}
                          onChange={(location: LocationData | null) => {
                            setP2SelectedCity(location);
                            if (location && location.country) {
                              setP2SelectedCountry({
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
                          value={p2SelectedCountry?.name || ''}
                          onChange={(location: LocationData | null) => setP2SelectedCountry(location)}
                          placeholder="Search country..."
                          searchType="country"
                          isLight={isLight}
                        />
                      </div>
                    </Row>
                  </FormSection>
                </PersonColumn>
              )}
            </FormGrid>

            {error && <ErrorMessage $isLight={isLight}>{error}</ErrorMessage>}

            <SubmitButton type="submit" $isLight={isLight}>
              {chartType === 'synastry' ? 'Reveal Your Synastry' : 'Reveal Your Star'}
            </SubmitButton>
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
