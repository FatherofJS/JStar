export const SYNASTRY_INTRO = "Synastry is the astrological study of relationships. By overlaying two natal charts, we can see how the planets of one person interact with the planets of the other. This cross-chart alignment highlights areas of harmony, attraction, friction, and growth between two people.";

export const ASPECT_WEIGHTS: Record<string, number> = {
  conjunction: 12,   // Powerful, intense, binding
  trine: 10,         // Natural harmony
  sextile: 6,        // Supportive
  square: -8,        // Friction
  opposition: -5     // Magnetism / Polarity
};

export const ASPECT_MEANINGS: Record<string, string> = {
  conjunction: "A powerful blending of energies. You share a direct, intense connection here, but it can be overwhelming if both planets are volatile.",
  sextile: "A friendly and supportive interaction. This aspect brings out the best in both of you through encouragement.",
  square: "Friction and tension. This alignment creates challenges you must actively work through, but overcoming them brings growth.",
  trine: "A natural, easy flow of energy. You understand each other effortlessly in this area, creating deep harmony.",
  opposition: "Polarity and magnetism. You attract each other through your differences, but must actively balance these opposing forces."
};

export function calculateSynastryScore(aspects: { type: string }[]): number {
  if (!aspects || aspects.length === 0) return 50;
  
  // Base score starts at 50 to avoid negative totals for heavily squared charts, gives a baseline.
  let score = 50; 
  
  for (const aspect of aspects) {
    const type = aspect.type.toLowerCase();
    if (ASPECT_WEIGHTS[type]) {
      score += ASPECT_WEIGHTS[type];
    }
  }
  
  // Cap between 1 and 100
  return Math.max(1, Math.min(100, score));
}
