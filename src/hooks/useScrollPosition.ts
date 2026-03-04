// useScrollPosition - Custom hook for scroll position tracking
// Handles scroll events with requestAnimationFrame for performance

import { useEffect, useState, useRef } from "react";
import { SCROLL } from "../constants";

interface UseScrollPositionReturn {
  isScrolled: boolean;
  scrollY: number;
}

export function useScrollPosition(): UseScrollPositionReturn {
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
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

