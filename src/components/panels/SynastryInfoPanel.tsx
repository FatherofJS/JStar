import styled from "styled-components";
import type { SynastryData } from "../../types/chart";
import { SYNASTRY_ASPECT_PAIR_MEANINGS } from "../../data/synastryAspectInterpretations";
import { ASPECT_COLORS } from "../../types/chart";

import { PanelContainer, SectionTitle, IntroText, Table, TableRow, LabelWrap, RowTitle, RowContent } from "./Panel.styles";

const GaugeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 40px 0 60px;
`;

const ScoreCircle = styled.div<{ $score: number; $isLight: boolean }>`
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: ${({ $isLight }) => $isLight ? "rgba(241, 245, 249, 0.8)" : "rgba(255, 255, 255, 0.05)"};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.1);

  &::before {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    background: conic-gradient(
      ${({ $score }) => $score >= 70 ? '#ec4899, #8b5cf6' : $score >= 40 ? '#6366f1, #3b82f6' : '#94a3b8, #64748b'} ${({ $score }) => $score}%, 
      transparent ${({ $score }) => $score}% 100%
    );
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    background: ${({ $isLight }) => $isLight ? "#ffffff" : "#0f172a"};
    z-index: 0;
  }
`;

const ScoreValue = styled.div<{ $isLight: boolean }>`
  position: relative;
  z-index: 1;
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    -webkit-text-fill-color: ${({ $isLight }) => $isLight ? "#64748b" : "rgba(255, 255, 255, 0.5)"};
    margin-top: 4px;
  }
`;

interface SynastryInfoPanelProps {
  data: SynastryData;
  isLight: boolean;
}

const PLANETS_VI: Record<string, string> = {
  Sun: 'Mặt Trời', Moon: 'Mặt Trăng', Mercury: 'Thủy Tinh', Venus: 'Kim Tinh', Mars: 'Hỏa Tinh',
  Jupiter: 'Mộc Tinh', Saturn: 'Thổ Tinh', Uranus: 'Thiên Vương', Neptune: 'Hải Vương', Pluto: 'Diêm Vương', Ascendant: 'Cung Mọc'
};

const TYPES_VI: Record<string, string> = {
  conjunction: 'Trùng Tụ', trine: 'Tam Hợp', sextile: 'Lục Hợp', square: 'Vuông Góc', opposition: 'Đối Đỉnh'
};

const PLANET_ORDER = ['Ascendant', 'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];

const getAspectKey = (p1: string, p2: string) => {
  const i1 = PLANET_ORDER.indexOf(p1);
  const i2 = PLANET_ORDER.indexOf(p2);
  if (i1 === -1 || i2 === -1) return `${p1}_${p2}`;
  return i1 <= i2 ? `${p1}_${p2}` : `${p2}_${p1}`;
};

export function calculateSynastryScore(aspects: { type: string, orb?: number }[]): number {
  if (!aspects || aspects.length === 0) return 20;

  let baseScore = 50;
  let currentWeight = 0;

  for (const aspect of aspects) {
    const orb = aspect.orb ?? 0;
    let weightValue = 0;
    const orbDensity = Math.max(0.3, 1 - (orb / 7));

    switch (aspect.type.toLowerCase()) {
      case 'conjunction': weightValue = 18; break;
      case 'trine': weightValue = 12; break;
      case 'sextile': weightValue = 5; break;
      case 'square': weightValue = -16; break;
      case 'opposition': weightValue = -11; break;
    }
    currentWeight += (weightValue * orbDensity);
  }

  let finalScore = baseScore + currentWeight;
  if (finalScore >= 100) finalScore = 95 + Math.random() * 4;
  if (finalScore <= 0) finalScore = 2 + Math.random() * 6;

  return Math.round(Math.max(1, Math.min(99, finalScore)));
}

export function SynastryInfoPanel({ data, isLight }: SynastryInfoPanelProps) {
  const validPlanets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Ascendant'];
  const validAspectsList = ['conjunction', 'trine', 'sextile', 'square', 'opposition'];

  const filteredAspects = data.aspects
    .filter(a => {
      if (!validAspectsList.includes(a.type.toLowerCase())) return false;
      if (!validPlanets.includes(a.person1_planet)) return false;
      if (!validPlanets.includes(a.person2_planet)) return false;
      return a.orb <= 7;
    })
    .sort((a, b) => a.orb - b.orb);

  const score = calculateSynastryScore(filteredAspects);

  return (
    <PanelContainer $isLight={isLight}>
      <SectionTitle $isLight={isLight}>Bảng Đo Nhân Phẩm Tình Yêu</SectionTitle>
      <IntroText $isLight={isLight}>
        Đây là phần synastry, nơi đặt hai bản đồ sao cạnh nhau để xem cách hai người tác động qua lại. Hệ thống tập trung vào những điểm tương tác mạnh nhất, nơi cảm xúc, hành động và cái tôi dễ va chạm hoặc kéo nhau đi rất xa.

        Bạn sẽ thấy rõ chỗ nào hợp tự nhiên, chỗ nào dễ căng, và vì sao có những thứ vừa hút vừa mệt. Không phải để phán đúng sai, mà để nhìn thẳng vào cách mối quan hệ này vận hành khi đặt hai người cạnh nhau.
      </IntroText>
      <GaugeContainer>
        <ScoreCircle $score={score} $isLight={isLight}>
          <ScoreValue $isLight={isLight}>
            {score}%
            <span>Độ Phù Hợp</span>
          </ScoreValue>
        </ScoreCircle>
      </GaugeContainer>

      <SectionTitle $isLight={isLight}>Nhân Duyên Quả Báo</SectionTitle>
      <Table $isLight={isLight} data-tour="synastry-aspects">
        {filteredAspects.length > 0 ? filteredAspects.map(aspect => {
          const typeKey = aspect.type.toLowerCase();
          const p1Name = aspect.person1_planet === "True_North_Lunar_Node" ? "North Node" : aspect.person1_planet === "True_South_Lunar_Node" ? "South Node" : aspect.person1_planet;
          const p2Name = aspect.person2_planet === "True_North_Lunar_Node" ? "North Node" : aspect.person2_planet === "True_South_Lunar_Node" ? "South Node" : aspect.person2_planet;
          const pairKey = getAspectKey(p1Name, p2Name);
          const meaningDict = SYNASTRY_ASPECT_PAIR_MEANINGS[pairKey];
          const meaning = meaningDict?.[typeKey] || "Chưa có lời phán. Cứ cẩn thận thì hơn.";

          return (
            <TableRow key={aspect.id || `${aspect.person1_planet}-${aspect.person2_planet}-${aspect.type}`} $isLight={isLight} $columns="minmax(180px, 200px) 1fr">
              <LabelWrap>
                <RowTitle $isLight={isLight}>
                  <span style={{ color: '#ff6b8a' }}>{PLANETS_VI[p1Name] || p1Name}</span>
                  <span style={{ color: ASPECT_COLORS[aspect.type], margin: '0 8px' }}>
                    {TYPES_VI[typeKey] || aspect.type}
                  </span>
                  <span style={{ color: '#6bcbff' }}>{PLANETS_VI[p2Name] || p2Name}</span>
                </RowTitle>
              </LabelWrap>
              <RowContent $isLight={isLight}>
                <strong style={{ display: 'block', marginBottom: '4px', textTransform: 'capitalize', color: ASPECT_COLORS[aspect.type] }}>
                  Loại: {TYPES_VI[typeKey] || aspect.type}
                </strong>
                {meaning}
              </RowContent>
            </TableRow>
          );
        }) : (
          <IntroText $isLight={isLight}>Quá bàng quan mờ nhạt. Không có cái móc nối nghiệp chướng lớn nào xảy ra, cẩn thận nhanh chán.</IntroText>
        )}
      </Table>
    </PanelContainer>
  );
}
