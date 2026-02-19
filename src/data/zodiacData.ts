// Zodiac and constellation data for the LandingPage
// Uses images from assets/zodiac directory

import ariesImg from "../assets/zodiac/aries.png";
import taurusImg from "../assets/zodiac/taurus.png";
import geminiImg from "../assets/zodiac/gemini.png";
import cancerImg from "../assets/zodiac/cancer.png";
import leoImg from "../assets/zodiac/leo.png";
import virgoImg from "../assets/zodiac/virgo.png";
import libraImg from "../assets/zodiac/libra.png";
import scorpioImg from "../assets/zodiac/scorpio.png";
import sagittariusImg from "../assets/zodiac/sagittarius.png";
import capricornImg from "../assets/zodiac/capricorn.png";
import aquariusImg from "../assets/zodiac/aquarius.png";
import piscesImg from "../assets/zodiac/pisces.png";

// Export zodiac images map
export const zodiacImages: Record<string, string> = {
  Aries: ariesImg,
  Taurus: taurusImg,
  Gemini: geminiImg,
  Cancer: cancerImg,
  Leo: leoImg,
  Virgo: virgoImg,
  Libra: libraImg,
  Scorpio: scorpioImg,
  Sagittarius: sagittariusImg,
  Capricorn: capricornImg,
  Aquarius: aquariusImg,
  Pisces: piscesImg,
};

// Zodiac data with name, symbol, and display color
export interface ZodiacData {
  name: string;
  symbol: string;
  color: string;
}

export const zodiac: ZodiacData[] = [
  { name: "Aries", symbol: "♈", color: "#ff6b6b" },
  { name: "Taurus", symbol: "♉", color: "#4ecdc4" },
  { name: "Gemini", symbol: "♊", color: "#ffd93d" },
  { name: "Cancer", symbol: "♋", color: "#6c5ce7" },
  { name: "Leo", symbol: "♌", color: "#ff9f43" },
  { name: "Virgo", symbol: "♍", color: "#1dd1a1" },
  { name: "Libra", symbol: "♎", color: "#54a0ff" },
  { name: "Scorpio", symbol: "♏", color: "#ee5253" },
  { name: "Sagittarius", symbol: "♐", color: "#f368e0" },
  { name: "Capricorn", symbol: "♑", color: "#00d2d3" },
  { name: "Aquarius", symbol: "♒", color: "#5f27cd" },
  { name: "Pisces", symbol: "♓", color: "#10ac84" },
];

// Star position type
export interface StarPosition {
  x: number;
  y: number;
}

// Constellation line connection type (index pairs)
export type ConstellationLines = [number, number][];

// Constellation data type
export interface ConstellationData {
  stars: StarPosition[];
  lines: ConstellationLines;
}

// All constellation star positions and line connections
export const constellationMap: Record<string, ConstellationData> = {
  Aries: {
    stars: [
      { x: 18, y: 52 },
      { x: 30, y: 54 },
      { x: 50, y: 58 },
      { x: 65, y: 40 },
      { x: 72, y: 65 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 4],
      [2, 3],
    ],
  },

  Taurus: {
    stars: [
      { x: 8, y: 20 },
      { x: 28, y: 28 },
      { x: 48, y: 38 },
      { x: 55, y: 50 },
      { x: 45, y: 55 },
      { x: 30, y: 60 },
      { x: 15, y: 50 },
      { x: 60, y: 55 },
      { x: 75, y: 52 },
      { x: 82, y: 62 },
      { x: 68, y: 65 },
      { x: 55, y: 68 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [3, 7],
      [7, 8],
      [8, 9],
      [7, 10],
      [10, 11],
    ],
  },

  Gemini: {
    stars: [
      { x: 35, y: 20 },
      { x: 35, y: 35 },
      { x: 35, y: 50 },
      { x: 30, y: 65 },
      { x: 40, y: 75 },
      { x: 55, y: 75 },
      { x: 60, y: 60 },
      { x: 60, y: 45 },
      { x: 60, y: 30 },
      { x: 70, y: 25 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
    ],
  },

  Cancer: {
    stars: [
      { x: 40, y: 20 },
      { x: 45, y: 40 },
      { x: 50, y: 55 },
      { x: 35, y: 70 },
      { x: 60, y: 70 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
    ],
  },

  Leo: {
    stars: [
      { x: 10, y: 55 },
      { x: 22, y: 42 },
      { x: 30, y: 55 },
      { x: 50, y: 55 },
      { x: 62, y: 48 },
      { x: 60, y: 35 },
      { x: 68, y: 25 },
      { x: 80, y: 22 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 0],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
    ],
  },

  Virgo: {
    stars: [
      { x: 18, y: 62 },
      { x: 22, y: 48 },
      { x: 30, y: 38 },
      { x: 45, y: 42 },
      { x: 58, y: 40 },
      { x: 70, y: 30 },
      { x: 78, y: 22 },
      { x: 30, y: 25 },
      { x: 30, y: 15 },
      { x: 10, y: 45 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [2, 7],
      [7, 8],
      [1, 9],
    ],
  },

  Libra: {
    stars: [
      { x: 30, y: 20 },
      { x: 18, y: 38 },
      { x: 45, y: 38 },
      { x: 48, y: 58 },
      { x: 25, y: 58 },
      { x: 15, y: 72 },
    ],
    lines: [
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 3],
      [1, 4],
      [4, 5],
    ],
  },

  Scorpio: {
    stars: [
      { x: 15, y: 40 },
      { x: 10, y: 50 },
      { x: 12, y: 62 },
      { x: 20, y: 72 },
      { x: 32, y: 78 },
      { x: 45, y: 72 },
      { x: 55, y: 66 },
      { x: 65, y: 60 },
      { x: 72, y: 58 },
      { x: 80, y: 58 },
      { x: 88, y: 60 },
      { x: 95, y: 55 },
      { x: 92, y: 65 },
      { x: 85, y: 70 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 11],
      [10, 12],
      [10, 13],
    ],
  },

  Sagittarius: {
    stars: [
      { x: 18, y: 30 },
      { x: 24, y: 40 },
      { x: 30, y: 50 },
      { x: 30, y: 62 },
      { x: 26, y: 74 },
      { x: 38, y: 70 },
      { x: 44, y: 62 },
      { x: 52, y: 58 },
      { x: 60, y: 56 },
      { x: 70, y: 58 },
      { x: 78, y: 52 },
      { x: 72, y: 66 },
      { x: 78, y: 74 },
      { x: 70, y: 82 },
      { x: 36, y: 80 },
      { x: 30, y: 86 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [9, 11],
      [11, 12],
      [12, 13],
      [4, 14],
      [14, 15],
    ],
  },

  Capricorn: {
    stars: [
      { x: 50, y: 18 },
      { x: 42, y: 32 },
      { x: 58, y: 44 },
      { x: 72, y: 64 },
      { x: 52, y: 70 },
      { x: 32, y: 68 },
      { x: 18, y: 62 },
      { x: 24, y: 54 },
      { x: 34, y: 48 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 1],
    ],
  },

  Aquarius: {
    stars: [
      { x: 20, y: 52 },
      { x: 28, y: 48 },
      { x: 36, y: 46 },
      { x: 44, y: 44 },
      { x: 50, y: 36 },
      { x: 54, y: 28 },
      { x: 56, y: 44 },
      { x: 66, y: 48 },
      { x: 76, y: 48 },
      { x: 86, y: 48 },
      { x: 52, y: 58 },
      { x: 56, y: 70 },
      { x: 34, y: 58 },
      { x: 30, y: 70 },
      { x: 24, y: 80 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [3, 4],
      [4, 5],
      [6, 10],
      [10, 11],
      [1, 12],
      [12, 13],
      [13, 14],
    ],
  },

  Pisces: {
    stars: [
      { x: 18, y: 30 },
      { x: 22, y: 36 },
      { x: 20, y: 44 },
      { x: 18, y: 52 },
      { x: 18, y: 62 },
      { x: 20, y: 72 },
      { x: 24, y: 80 },
      { x: 32, y: 76 },
      { x: 40, y: 74 },
      { x: 48, y: 72 },
      { x: 56, y: 70 },
      { x: 64, y: 68 },
      { x: 72, y: 66 },
      { x: 78, y: 66 },
      { x: 82, y: 70 },
      { x: 80, y: 76 },
      { x: 74, y: 76 },
      { x: 70, y: 72 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 12],
      [12, 13],
      [13, 14],
      [14, 15],
      [15, 16],
      [16, 17],
      [17, 12],
    ],
  },
};

// Utility function to generate random star intensity
export type StarIntensity = 0.2 | 0.5 | 1;

export const getStarIntensity = (): StarIntensity => {
  const r = Math.random();

  if (r < 0.7) return 0.2;
  if (r < 0.9) return 0.5;
  return 1;
};

// Get star size based on intensity
export const getStarSize = (intensity: StarIntensity): number => {
  if (intensity === 1) return 1.4;
  if (intensity === 0.5) return 1;
  return 0.6;
};

