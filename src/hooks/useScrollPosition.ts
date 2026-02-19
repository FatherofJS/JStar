// useScrollPosition - Custom hook for scroll position tracking
// Handles scroll events with requestAnimationFrame for performance

import { useEffect, useState } from "react";
import { SCROLL } from "../constants";

interface UseScrollPositionReturn {
  isScrolled: boolean;
}

export function useScrollPosition(): UseScrollPositionReturn {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > SCROLL.TRIGGER_THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isScrolled };
}

