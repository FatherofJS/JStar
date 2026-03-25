import { memo, useState } from "react";
import { DOCS_SECTIONS } from "../../data/docsContent";
import {
  DocsWrapper,
  DocsHeading,
  DocsLayout,
  Sidebar,
  SidebarItem,
  ContentBox,
  AnimatedContent,
  SectionTitle,
  SectionImage,
  Paragraph,
} from "./styles/DocsSection.styles";

function DocsSection() {
  const [activeId, setActiveId] = useState(DOCS_SECTIONS[0].id);

  const activeSection = DOCS_SECTIONS.find((s) => s.id === activeId) || DOCS_SECTIONS[0];

  return (
    <DocsWrapper data-section="docs" className="zoom-section">
      <DocsHeading>Kiến Thức Vũ Trụ</DocsHeading>
      <DocsLayout>
        <Sidebar>
          {DOCS_SECTIONS.map((s) => (
            <SidebarItem
              key={s.id}
              $active={activeId === s.id}
              onClick={() => setActiveId(s.id)}
            >
              {s.title}
            </SidebarItem>
          ))}
        </Sidebar>

        <ContentBox>
          <AnimatedContent key={activeId}>
            <SectionTitle>{activeSection.title}</SectionTitle>
            {activeSection.image && (
              <SectionImage src={activeSection.image} alt={activeSection.title} loading="lazy" />
            )}
            {activeSection.content.map((text, i) => (
              <Paragraph key={i}>{text}</Paragraph>
            ))}
          </AnimatedContent>
        </ContentBox>
      </DocsLayout>
    </DocsWrapper>
  );
}

export default memo(DocsSection);

