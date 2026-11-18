export const visualPresets = [
  "kanade-original",
  "dark-homelab",
  "custom",
  "slate-professional",
  "warm-paper",
  "forest",
] as const;

export type VisualPreset = (typeof visualPresets)[number];

export function isVisualPreset(value: string | null): value is VisualPreset {
  return value !== null && visualPresets.includes(value as VisualPreset);
}
