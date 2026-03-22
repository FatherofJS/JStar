
import type { ChartData } from "../../types/chart";
import { NATAL_INTRO, PLANET_MEANINGS, HOUSE_MEANINGS } from "../../data/natalInterpretations";

import { PanelContainer, SectionTitle, IntroText, Table, TableRow, LabelWrap, RowTitle, RowSubtitle, RowContent, Divider } from "./Panel.styles";

interface NatalInfoPanelProps {
  data: ChartData;
  isLight: boolean;
}

export function NatalInfoPanel({ data, isLight }: NatalInfoPanelProps) {
  return (
    <PanelContainer $isLight={isLight}>
      <SectionTitle $isLight={isLight}>✨ Your Cosmic Blueprint</SectionTitle>
      <IntroText $isLight={isLight}>{NATAL_INTRO}</IntroText>

      <SectionTitle $isLight={isLight}>Planetary Placements</SectionTitle>
      <Table $isLight={isLight}>
        {data.planets.map(p => (
          <TableRow key={p.name} $isLight={isLight}>
            <LabelWrap>
              <RowTitle $isLight={isLight}>{p.name} in {p.sign}</RowTitle>
              <RowSubtitle $isLight={isLight}>House {p.house}</RowSubtitle>
            </LabelWrap>
            <RowContent $isLight={isLight}>
              {PLANET_MEANINGS[p.name] || `The influence of ${p.name} shaping your experiences.`}
            </RowContent>
          </TableRow>
        ))}
      </Table>

      <Divider $isLight={isLight} />

      <SectionTitle $isLight={isLight}>The 12 Houses</SectionTitle>
      <Table $isLight={isLight}>
        {data.houses.map(h => (
          <TableRow key={h.id} $isLight={isLight}>
            <LabelWrap>
              <RowTitle $isLight={isLight}>House {h.id}</RowTitle>
              <RowSubtitle $isLight={isLight}>in {h.sign}</RowSubtitle>
            </LabelWrap>
            <RowContent $isLight={isLight}>
              {HOUSE_MEANINGS[h.id] || `The area of life dealing with House ${h.id} matters.`}
            </RowContent>
          </TableRow>
        ))}
      </Table>
    </PanelContainer>
  );
}
