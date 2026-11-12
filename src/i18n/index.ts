import settings from "../site.config.json" with { type: "json" };
import en from "./en.json" with { type: "json" };

export const language = "en" as const;
export const languages = [language] as const;
export type Language = typeof language;
export type TranslationKey = keyof typeof en;
type Dictionary = typeof en;
export const locale = "en-US" as const;
export const ogLocale = "en_US" as const;

export function translate(
  key: TranslationKey,
  values: Record<string, string | number> = {},
): string {
  const dictionary: Dictionary = en;
  const overrides = settings.text as Partial<Dictionary>;
  const singularKey = `${key}.one` as TranslationKey;
  const selectedKey =
    typeof values.count === "number" &&
    new Intl.PluralRules(locale).select(values.count) === "one" &&
    singularKey in dictionary
      ? singularKey
      : key;
  const text = overrides[selectedKey] ?? dictionary[selectedKey];
  if (typeof text !== "string")
    throw new Error(`Unknown translation key: ${selectedKey}`);
  const parameters = {
    site: settings.site.name,
    name: settings.author.name,
    ...values,
  };
  return text.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    name in parameters
      ? String(parameters[name as keyof typeof parameters])
      : placeholder,
  );
}
export const t = (
  key: TranslationKey,
  values?: Record<string, string | number>,
) => translate(key, values);

export function formatDate(
  value: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone: "UTC",
    ...options,
  }).format(new Date(value));
}
