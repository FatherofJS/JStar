import { useState, useEffect } from "react";

/**
 * Custom hook to calculate a dynamic scale factor based on window width.
 * @param baseWidth The reference screen width for 1:1 scale (default 1400).
 * @param minScale The minimum allowed scale (default 0.45).
 * @param maxScale The maximum allowed scale (default 0.9).
 * @returns The calculated scale number based on current window width.
 */
export const useDynamicScale = (baseWidth = 1400, minScale = 0.45, maxScale = 0.9) => {
  const [scale, setScale] = useState(maxScale);

  useEffect(() => {
    const handleResize = () => {
      // Calculate scale based on screen width
      const calculatedScale = Math.min(
        maxScale,
        Math.max(minScale, window.innerWidth / baseWidth)
      );
      setScale(calculatedScale);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial calculation

    return () => window.removeEventListener("resize", handleResize);
  }, [baseWidth, minScale, maxScale]);

  return scale;
};
