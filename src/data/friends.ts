import { t } from "../i18n";
import { personalInfo } from "../config";
// Add personal links using the same structure as these open source projects.
export const friends = [
  {
    name: "Astro",
    description: t("friend.astroDescription"),
    url: "https://astro.build/",
    icon: "icon-[simple-icons--astro]",
    color: "purple",
    label: t("friend.astroLabel"),
  },
  {
    name: "Vue.js",
    description: t("friend.vueDescription"),
    url: "https://vuejs.org/",
    icon: "icon-[simple-icons--vuedotjs]",
    color: "green",
    label: t("friend.vueLabel"),
  },
  {
    name: "Tailwind CSS",
    description: t("friend.tailwindDescription"),
    url: "https://tailwindcss.com/",
    icon: "icon-[simple-icons--tailwindcss]",
    color: "blue",
    label: t("friend.tailwindLabel"),
  },
  {
    name: "Kanade-Astro",
    description: "The Astro theme used as the foundation for this site.",
    url: "https://github.com/sudoriaa/Kanade-Astro",
    icon: "icon-[simple-icons--astro]",
    color: "purple",
    label: "Theme source",
  },
  {
    name: `${personalInfo.englishName} / GitHub`,
    description: t("friend.githubDescription"),
    url: personalInfo.github,
    icon: "icon-[jam--github]",
    color: "pink",
    label: t("friend.githubLabel"),
  },
];
