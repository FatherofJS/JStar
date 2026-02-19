// useScrollPosition - Custom hook for scroll position tracking
// Handles scroll events with requestAnimationFrame for performance

import { useEffect, useState } from "react";
import { SCROLL } from "../constants";

interface UseScrollPositionReturn {
  isScrolled: boolean;
  scrollY: number;
}

export function useScrollPosition(): UseScrollPositionReturn {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { 
    isScrolled: scrollY > SCROLL.TRIGGER_THRESHOLD,
    scrollY 
  };
}

