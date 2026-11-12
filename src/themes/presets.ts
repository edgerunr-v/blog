export const visualPresets = [
  "kanade-original",
  "dark-homelab",
  "custom",
] as const;

export type VisualPreset = (typeof visualPresets)[number];

export function isVisualPreset(value: string | null): value is VisualPreset {
  return value !== null && visualPresets.includes(value as VisualPreset);
}
