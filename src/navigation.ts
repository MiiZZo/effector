import type { LText } from "./consts";

export const navigation: Navigation = [
  {
    text: { en: "Docs", ru: "Начало работы" },
    link: "/introduction/installation",
    activeMatch: /^\/(introduction|conventions|explanation|typescript)\//,
  },
  {
    text: { en: "API" },
    activeMatch: /^\/(api)\//,
    items: [
      {
        text: { en: "Effector" },
        link: "/api/effector/",
      },
      {
        text: { en: "Effector React" },
        link: "/api/effector-react/",
      },
      {
        text: { en: "Effector Solid" },
        link: "/api/effector-solid/",
      },
      {
        text: { en: "Effector Vue" },
        link: "/api/effector-vue/",
      },
    ],
  },
  {
    text: { en: "Recipes", ru: "Рецепты" },
    link: "/recipes/",
    activeMatch: /^\/recipes\//,
  },
  {
    text: { en: "Blog", ru: "Блог" },
    link: "https://www.patreon.com/zero_bias",
  },
  {
    text: { en: "Playground", ru: "Песочница" },
    link: "https://share.effector.dev",
  },
  {
    text: { en: "Changelog", ru: "Изменения" },
    link: "https://changelog.effector.dev/",
  },
];

type NavigationItem = {
  text: LText;
  link: string;
  activeMatch?: RegExp;
};

type NavigationGroup = {
  text: LText;
  activeMatch?: RegExp;
  items: NavigationItem[];
};

type Navigation = (NavigationItem | NavigationGroup)[];
