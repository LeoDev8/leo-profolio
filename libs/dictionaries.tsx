import "server-only";
import { LOCALES } from "@/config/locales";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  zh: () => import("@/dictionaries/zh.json").then((module) => module.default),
  hk: () => import("@/dictionaries/hk.json").then((module) => module.default),
  jp: () => import("@/dictionaries/jp.json").then((module) => module.default),
};

export const getDictionary = async (locale: keyof typeof LOCALES) =>
  dictionaries[locale]();
