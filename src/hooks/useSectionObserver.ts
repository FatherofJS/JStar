// useSectionObserver - Custom hook for section-based navigation
// Handles intersection observer for tracking which section is in view

import { useEffect, useState, useRef } from "react";
import { SCROLL, SECTIONS, type SectionId } from "../constants";

interface UseSectionObserverReturn {
  activeSection: SectionId;
}

export function useSectionObserver(): UseSectionObserverReturn {
  const [activeSection, setActiveSection] = useState<SectionId>(
    SECTIONS.HOME as SectionId
  );
  
  // Use ref to track current active section to avoid stale closures
  const activeSectionRef = useRef<SectionId>(SECTIONS.HOME as SectionId);

  useEffect(() => {
    const sections = document.querySelectorAll(".zoom-section");
    const allowSectionAnimations = !window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 1440px), (max-height: 900px)"
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-section") as SectionId;

          if (entry.isIntersecting) {
            if (allowSectionAnimations) {
              entry.target.classList.add("zoom-in");
              entry.target.classList.remove("zoom-out");
            }

            if (id && activeSectionRef.current !== id) {
              activeSectionRef.current = id;
              setActiveSection(id);
            }
          } else if (allowSectionAnimations) {
            entry.target.classList.remove("zoom-in");
            entry.target.classList.add("zoom-out");
          }
        });
      },
      {
        threshold: SCROLL.INTERSECTION_THRESHOLD,
        rootMargin: SCROLL.ROOT_MARGIN,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return { activeSection };
}

