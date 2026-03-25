import styled from "styled-components";
import type { SynastryData } from "../../types/chart";
import { SYNASTRY_INTRO, ASPECT_MEANINGS, calculateSynastryScore } from "../../data/synastryInterpretations";
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
  box-shadow: 
    inset 0 0 20px rgba(0,0,0,0.1),
    0 0 40px ${({ $score }) => $score >= 70 ? 'rgba(236, 72, 153, 0.3)' : $score >= 40 ? 'rgba(99, 102, 241, 0.3)' : 'rgba(100, 116, 139, 0.3)'};

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
    .sort((a, b) => a.orb - b.orb)
    .slice(0, 8);

  const score = calculateSynastryScore(filteredAspects);

  return (
    <PanelContainer $isLight={isLight}>
      <SectionTitle $isLight={isLight}>Bảng Đo Nhân Phẩm Tình Yêu</SectionTitle>
      <IntroText $isLight={isLight}>{SYNASTRY_INTRO}</IntroText>

      <GaugeContainer>
        <ScoreCircle $score={score} $isLight={isLight}>
          <ScoreValue $isLight={isLight}>
            {score}%
            <span>Độ Phù Hợp</span>
          </ScoreValue>
        </ScoreCircle>
      </GaugeContainer>

      <SectionTitle $isLight={isLight}>Nhân Duyên Quả Báo (Cross-Aspects)</SectionTitle>
      <Table $isLight={isLight} data-tour="synastry-aspects">
        {filteredAspects.length > 0 ? filteredAspects.map(aspect => {
          const typeKey = aspect.type.toLowerCase();

          return (
            <TableRow key={aspect.id || `${aspect.person1_planet}-${aspect.person2_planet}-${aspect.type}`} $isLight={isLight} $columns="200px 1fr" style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: 'minmax(180px, 200px) 1fr', gap: '20px' }}>
              <LabelWrap>
                <RowTitle $isLight={isLight}>
                  <span style={{ color: '#ff6b8a' }}>{PLANETS_VI[aspect.person1_planet] || aspect.person1_planet}</span>
                  <span style={{ color: ASPECT_COLORS[aspect.type], margin: '0 8px' }}>
                    {TYPES_VI[typeKey] || aspect.type}
                  </span>
                  <span style={{ color: '#6bcbff' }}>{PLANETS_VI[aspect.person2_planet] || aspect.person2_planet}</span>
                </RowTitle>
              </LabelWrap>
              <RowContent $isLight={isLight}>
                <strong style={{ display: 'block', marginBottom: '4px', textTransform: 'capitalize', color: ASPECT_COLORS[aspect.type] }}>
                  Loại: {TYPES_VI[typeKey] || aspect.type}
                </strong>
                {ASPECT_MEANINGS[typeKey] || "Chưa có lời phán. Cứ cẩn thận thì hơn."}
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
