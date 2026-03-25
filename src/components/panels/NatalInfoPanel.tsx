
import type { ChartData } from "../../types/chart";
import { NATAL_INTRO, PLANET_MEANINGS, HOUSE_MEANINGS } from "../../data/natalInterpretations";

import { PanelContainer, SectionTitle, IntroText, Table, TableRow, LabelWrap, RowTitle, RowSubtitle, RowContent, Divider } from "./Panel.styles";

interface NatalInfoPanelProps {
  data: ChartData;
  isLight: boolean;
}

const PLANETS_VI: Record<string, string> = {
  Sun: 'Mặt Trời', Moon: 'Mặt Trăng', Mercury: 'Thủy Tinh', Venus: 'Kim Tinh', Mars: 'Hỏa Tinh',
  Jupiter: 'Mộc Tinh', Saturn: 'Thổ Tinh', Uranus: 'Thiên Vương', Neptune: 'Hải Vương', Pluto: 'Diêm Vương', Ascendant: 'Cung Mọc', Midheaven: 'Thiên Đỉnh'
};

const SIGNS_VI: Record<string, string> = {
  Aries: 'Bạch Dương', Taurus: 'Kim Ngưu', Gemini: 'Song Tử', Cancer: 'Cự Giải', Leo: 'Sư Tử', Virgo: 'Xử Nữ',
  Libra: 'Thiên Bình', Scorpio: 'Bọ Cạp', Sagittarius: 'Nhân Mã', Capricorn: 'Ma Kết', Aquarius: 'Bảo Bình', Pisces: 'Song Ngư'
};

export function NatalInfoPanel({ data, isLight }: NatalInfoPanelProps) {
  return (
    <PanelContainer $isLight={isLight}>
      <SectionTitle $isLight={isLight}>Bản Đồ Sao Cá Nhân</SectionTitle>
      <IntroText $isLight={isLight}>{NATAL_INTRO}</IntroText>

      <SectionTitle $isLight={isLight}>Bản Vị Hành Tinh</SectionTitle>
      <Table $isLight={isLight} data-tour="natal-planets">
        {data.planets.map(p => (
          <TableRow key={p.name} $isLight={isLight}>
            <LabelWrap>
              <RowTitle $isLight={isLight}>{PLANETS_VI[p.name] || p.name} tại {SIGNS_VI[p.sign] || p.sign}</RowTitle>
              <RowSubtitle $isLight={isLight}>Nhà {p.house}</RowSubtitle>
            </LabelWrap>
            <RowContent $isLight={isLight}>
              {PLANET_MEANINGS[p.name] || `Ảnh hưởng của ${p.name} lên cuộc sống bạn.`}
            </RowContent>
          </TableRow>
        ))}
      </Table>

      <Divider $isLight={isLight} />

      <SectionTitle $isLight={isLight}>12 Nhà Mệnh</SectionTitle>
      <Table $isLight={isLight} data-tour="natal-houses">
        {data.houses.map(h => (
          <TableRow key={h.id} $isLight={isLight}>
            <LabelWrap>
              <RowTitle $isLight={isLight}>Nhà {h.id}</RowTitle>
              <RowSubtitle $isLight={isLight}>tại {SIGNS_VI[h.sign] || h.sign}</RowSubtitle>
            </LabelWrap>
            <RowContent $isLight={isLight}>
              {HOUSE_MEANINGS[h.id] || `Lĩnh vực cuộc sống liên quan đến Nhà ${h.id}.`}
            </RowContent>
          </TableRow>
        ))}
      </Table>
    </PanelContainer>
  );
}
