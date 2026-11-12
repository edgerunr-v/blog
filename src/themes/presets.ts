export const visualPresets = [
  "kanade-original",
  "dark-homelab",
  "custom",
] as const;

export type VisualPreset = (typeof visualPresets)[number];
