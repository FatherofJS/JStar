import { useEffect, useState } from "react";

const LANDING_PERFORMANCE_QUERY =
  "(prefers-reduced-motion: reduce)";

export function useLanding() {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(LANDING_PERFORMANCE_QUERY);

    const updatePerformanceMode = () => {
      setIsReduced(mediaQuery.matches);
    };

    updatePerformanceMode();
    mediaQuery.addEventListener("change", updatePerformanceMode);

    return () => {
      mediaQuery.removeEventListener("change", updatePerformanceMode);
    };
  }, []);

  return { isReduced };
}
