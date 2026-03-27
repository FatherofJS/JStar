
import type { ChartData } from "../../types/chart";
import { PLANET_SIGN_MEANINGS } from "../../data/planetSignInterpretations";
import { HOUSE_SIGN_MEANINGS } from "../../data/houseSignInterpretations";
import { PanelContainer, SectionTitle, IntroText, Table, TableRow, LabelWrap, RowTitle, RowSubtitle, RowContent, Divider } from "./Panel.styles";

interface NatalInfoPanelProps {
  data: ChartData;
  isLight: boolean;
}

const PLANETS_VI: Record<string, string> = {
  Sun: 'Mặt Trời', Moon: 'Mặt Trăng', Mercury: 'Sao Thủy', Venus: 'Sao Kim', Mars: 'Sao Hỏa',
  Jupiter: 'Sao Mộc', Saturn: 'Sao Thổ', Uranus: 'Sao Thiên Vương', Neptune: 'Sao Hải Vương', Pluto: 'Sao Diêm Vương', Ascendant: 'Cung Mọc', Midheaven: 'Thiên Đỉnh'
};

const SIGNS_VI: Record<string, string> = {
  Aries: 'Bạch Dương', Taurus: 'Kim Ngưu', Gemini: 'Song Tử', Cancer: 'Cự Giải', Leo: 'Sư Tử', Virgo: 'Xử Nữ',
  Libra: 'Thiên Bình', Scorpio: 'Bọ Cạp', Sagittarius: 'Nhân Mã', Capricorn: 'Ma Kết', Aquarius: 'Bảo Bình', Pisces: 'Song Ngư'
};

export function NatalInfoPanel({ data, isLight }: NatalInfoPanelProps) {
  return (
    <PanelContainer $isLight={isLight}>
      <SectionTitle $isLight={isLight}>Bản Đồ Sao Cá Nhân</SectionTitle>
      <IntroText $isLight={isLight}>BỐC TRẦN LÁ SỐ: Đây là ảnh chụp bầu trời đúng cái khoảnh khắc bạn chào đời, lúc bạn còn chưa kịp fake personality. Mặt Trời, Mặt Trăng và cả đám hành tinh lúc đó đứng ở đâu, tụ lại kiểu gì thì nó build sẵn cái 'bản thiết kế con người' của bạn luôn. Không phải ngẫu nhiên bạn như này đâu, có kịch bản hết rồi. Đọc xong có thể hơi nhột. Nhưng thôi, vũ trụ nó không có thói quen nịnh người.</IntroText>

      <SectionTitle $isLight={isLight}>Bản Vị Hành Tinh</SectionTitle>
      <Table $isLight={isLight} data-tour="natal-planets">
        {data.planets.map(p => {
          const pName = p.name === "True_North_Lunar_Node" ? "North Node" :
                        p.name === "True_South_Lunar_Node" ? "South Node" : p.name;
          return (
            <TableRow key={p.name} $isLight={isLight}>
              <LabelWrap>
                <RowTitle $isLight={isLight}>{PLANETS_VI[pName] || pName} tại {SIGNS_VI[p.sign] || p.sign}</RowTitle>
                <RowSubtitle $isLight={isLight}>Nhà {p.house}</RowSubtitle>
              </LabelWrap>
              <RowContent $isLight={isLight}>
                {(() => {
                  const meaning = PLANET_SIGN_MEANINGS[pName]?.[p.sign];
                  return meaning || `Chưa có thông tin cụ thể cho ${PLANETS_VI[pName] || pName} tại ${SIGNS_VI[p.sign] || p.sign}. Vũ trụ vẫn đang giải mã...`;
                })()}
              </RowContent>
            </TableRow>
          );
        })}
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
              {HOUSE_SIGN_MEANINGS[h.id]?.[h.sign] || `Chưa có thông tin cụ thể cho Nhà ${h.id} tại ${SIGNS_VI[h.sign] || h.sign}. Vũ trụ vẫn đang giải mã...`}
            </RowContent>
          </TableRow>
        ))}
      </Table>
    </PanelContainer>
  );
}
