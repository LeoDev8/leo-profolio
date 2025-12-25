import { LocaleKey } from "@/config/locales";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get Current Language From router
export const getCurrentLang = (pathname: String) => {
  if (!pathname) return null;
  const segments = pathname.split("/");
  return segments[1];
};

// Handle Language Router Path
export const changeLangPathname = (pathname: String, newLang: LocaleKey) => {
  if (!newLang) return pathname;
  if (!pathname) return `/${newLang}`;

  const segments = pathname.split("/");
  segments[1] = newLang;
  const newUrl = segments.join("/");
  return newUrl;
};
