// StarChartPage Component - Personalized astrology chart page
import { useState, useCallback } from "react";
import styled from "styled-components";
import { Background } from "./Background";
import Layout from "./Layout";
import { useAuth } from "../contexts/AuthContext";

const PageWrapper = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const PageTitle = styled.h1`
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(90deg, var(--hero-gradient-start), var(--hero-gradient-mid), var(--hero-gradient-end));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;
`;

const WelcomeText = styled.p`
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 40px;
  text-align: center;
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  padding: 40px;
  
  @media (max-width: 768px) {
    padding: 24px 16px;
    border-radius: 16px;
  }
`;

const FormSection = styled.div`
  margin-bottom: 32px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-inverse);
  margin-bottom: 12px;
  letter-spacing: 1px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-inverse);
  font-size: 16px;
  outline: none;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: var(--hero-gradient-start);
    box-shadow: 0 0 0 3px rgba(120, 140, 255, 0.2);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-inverse);
  font-size: 16px;
  outline: none;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:focus {
    border-color: var(--hero-gradient-start);
    box-shadow: 0 0 0 3px rgba(120, 140, 255, 0.2);
  }
  
  option {
    background: var(--nav-bg);
    color: var(--text-inverse);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px 32px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #787cff, #a85aff);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(120, 140, 255, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 14px;
  text-align: center;
  margin-top: 16px;
  padding: 12px;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 8px;
`;

const ResultSection = styled.div`
  margin-top: 32px;
  text-align: center;
  padding: 24px;
  background: rgba(120, 140, 255, 0.1);
  border-radius: 16px;
  border: 1px solid rgba(120, 140, 255, 0.2);
`;

const ZodiacIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const ZodiacName = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-inverse);
  margin-bottom: 8px;
`;

const ZodiacDescription = styled.p`
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export default function StarChartPage() {
  const { user } = useAuth();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
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

    if (!day || !month || !year) {
      setError('Please fill in your date of birth.');
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

    const zodiacData = getZodiacSign(month, day);
    
    if (zodiacData) {
      setResult(zodiacData);
    } else {
      setError('Could not determine zodiac sign. Please check your date.');
    }
  }, [day, month, year, getZodiacSign]);

  return (
    <Layout>
      <Background showShootingStars={false} />
      <PageWrapper>
        <PageTitle>Your Star</PageTitle>
        <WelcomeText>Welcome, {user?.name}! Enter your birth details to discover your cosmic identity.</WelcomeText>

        <ChartContainer>
          <form onSubmit={handleSubmit}>
            <FormSection>
              <FormLabel>Date of Birth *</FormLabel>
              <Row>
                <FormSelect 
                  value={month} 
                  onChange={(e) => setMonth(e.target.value)}
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
                </FormSelect>
                <FormInput 
                  type="number" 
                  placeholder="Day"
                  min="1"
                  max="31"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  required
                />
              </Row>
            </FormSection>

            <FormSection>
              <FormLabel>Year *</FormLabel>
              <FormInput 
                type="number" 
                placeholder="Year (e.g., 1995)"
                min="1900"
                max={new Date().getFullYear()}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </FormSection>

            <FormSection>
              <FormLabel>Birth Time (Optional)</FormLabel>
              <FormInput 
                type="time" 
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
              />
            </FormSection>

            <FormSection>
              <FormLabel>Birth Place (Optional)</FormLabel>
              <FormInput 
                type="text" 
                placeholder="City, Country"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
              />
            </FormSection>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <SubmitButton type="submit">Reveal Your Star</SubmitButton>
          </form>

          {result && (
            <ResultSection>
              <ZodiacIcon>{result.icon}</ZodiacIcon>
              <ZodiacName>{result.zodiac}</ZodiacName>
              <ZodiacDescription>{result.description}</ZodiacDescription>
            </ResultSection>
          )}
        </ChartContainer>
      </PageWrapper>
    </Layout>
  );
}

