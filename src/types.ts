export enum WheelStyle {
  DISC = "DISC",
  HOLLOW = "HOLLOW",
  TRI_SPOKE = "TRI_SPOKE",
}

export interface TechnicalSpecs {
  topSpeed: string; // e.g. "85 km/h"
  range: string; // e.g. "140 km"
  battery: string; // e.g. "950 Wh Solid-State"
  weight: string; // e.g. "6.8 kg"
  aeroDrag: string; // e.g. "0.19 Cd"
  frameMaterial: string; // e.g. "IM8 Carbon monocoque"
}

export interface BikeModel {
  id: string; // "model-a" | "model-s" | "model-d"
  name: string; // "Cruxon Model A"
  seriesLetter: string; // "A" | "S" | "D"
  tagline: string; // "Aero Velocity Champion"
  description: string;
  price: number;
  specifications: TechnicalSpecs;
  accentColor: string; // Tailwind hex or class color for overlays
  glowColor: string; // CSS color for ambient shadows (e.g. rgba(56, 189, 248, 0.6))
  wheelStyle: WheelStyle;
  badge: string; // "Track Optimized" | "Urban Avant-Garde" | "Endurance Aero"
}

export interface CustomizationResult {
  modelRecommendation: string;
  modelReasoning: string;
  customAccents: string;
  gearRatio: string;
  weightSavings: string;
  laserGlowMode: string;
  estimatedBuildWeeks: number;
}
