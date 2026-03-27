
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
      <IntroText $isLight={isLight}>
        Đây là snapshot bầu trời đúng thời điểm bạn sinh ra. Vị trí của Mặt Trời, Mặt Trăng và các hành tinh lúc đó ghép lại thành một “bản thiết kế” về cách bạn vận hành: cách bạn suy nghĩ, phản ứng, đưa ra quyết định và tương tác với thế giới xung quanh.

        Nó cho thấy bạn tiếp cận cảm xúc ra sao, xử lý áp lực thế nào, dễ bị thu hút bởi kiểu người gì và thường mắc kẹt ở những vòng lặp nào. Không phải để dán nhãn hay bó buộc, mà để hiểu rõ cơ chế bên trong của mình và dùng nó một cách có ý thức hơn.
      </IntroText>
      <SectionTitle $isLight={isLight}>Bản Vị Hành Tinh</SectionTitle>
      <Table $isLight={isLight} data-tour="natal-planets">
        {data.planets.map(p => {
          const pName = p.name === "True_North_Lunar_Node" ? "North Node" :
            p.name === "True_South_Lunar_Node" ? "South Node" : p.name;
          return (
            <TableRow key={p.name} $isLight={isLight} $columns="minmax(160px, 200px) 1fr">
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
          <TableRow key={h.id} $isLight={isLight} $columns="minmax(160px, 200px) 1fr">
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
