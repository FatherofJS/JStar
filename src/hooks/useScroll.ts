import { useEffect, useState, useRef } from "react";
import { SCROLL, SECTIONS, type SectionId } from "../constants";

interface UseSectionObserverReturn {
  activeSection: SectionId;
}

export function useSectionObserver(): UseSectionObserverReturn {
  // Navigation tracking disabled to maximize scroll performance
  return { activeSection: SECTIONS.HOME as SectionId };
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
