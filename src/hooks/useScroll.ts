import { useEffect, useState, useRef } from "react";
import { SCROLL, SECTIONS, type SectionId } from "../constants";

interface UseSectionObserverReturn {
  activeSection: SectionId;
}

export function useSectionObserver(): UseSectionObserverReturn {
  const [activeSection, setActiveSection] = useState<SectionId>(
    SECTIONS.HOME as SectionId
  );
  
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

interface UseScrollPositionReturn {
  isScrolled: boolean;
  scrollY: number;
}

export function useScrollPosition(): UseScrollPositionReturn {
  const [isScrolled, setIsScrolled] = useState(false);
  const ticking = useRef(false);
  const scrollYRef = useRef(0);
  const isScrolledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const nextScrollY = window.scrollY;
          scrollYRef.current = nextScrollY;

          const nextIsScrolled = nextScrollY > SCROLL.TRIGGER_THRESHOLD;
          if (nextIsScrolled !== isScrolledRef.current) {
            isScrolledRef.current = nextIsScrolled;
            setIsScrolled(nextIsScrolled);
          }

          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { 
    isScrolled,
    scrollY: scrollYRef.current,
  };
}
