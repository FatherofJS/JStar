import { useState, useEffect, useCallback } from "react";
import { DOCS_SECTIONS } from "../data/docsContent";
import Background from "../components/layout/Background";
import {
  PageShell,
  DocsLayout,
  Sidebar,
  SidebarItem,
  ContentPanel,
  AccordionItem,
  AccordionHeader,
  AccordionTitle,
  Chevron,
  AccordionBody,
  Paragraph,
} from "./DocsPage.styles";

export default function DocsPage() {
  const [activeId, setActiveId] = useState(DOCS_SECTIONS[0].id);
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set([DOCS_SECTIONS[0].id])
  );

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setActiveId(id);
  }, []);

  const scrollAndOpen = useCallback((id: string) => {
    setActiveId(id);
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );

    for (const section of DOCS_SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <PageShell>
      <Background showShootingStars={false} forceReducedMotion />
      <DocsLayout>
        <Sidebar>
          {DOCS_SECTIONS.map((s) => (
            <SidebarItem
              key={s.id}
              $active={activeId === s.id}
              onClick={() => scrollAndOpen(s.id)}
            >
              {s.title}
            </SidebarItem>
          ))}
        </Sidebar>

        <ContentPanel>
          {DOCS_SECTIONS.map((section) => (
            <AccordionItem key={section.id} id={section.id}>
              <AccordionHeader
                $open={openIds.has(section.id)}
                onClick={() => toggle(section.id)}
              >
                <AccordionTitle>{section.title}</AccordionTitle>
                <Chevron $open={openIds.has(section.id)}>▾</Chevron>
              </AccordionHeader>
              <AccordionBody $open={openIds.has(section.id)}>
                {section.content.map((text, i) => (
                  <Paragraph key={i}>{text}</Paragraph>
                ))}
              </AccordionBody>
            </AccordionItem>
          ))}
        </ContentPanel>
      </DocsLayout>
    </PageShell>
  );
}
