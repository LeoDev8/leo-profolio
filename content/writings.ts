export type WritingPost = {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  status: "draft" | "planned";
  tags: string[];
};

export const writingPosts: WritingPost[] = [
  {
    title: "Building a personal site without overbuilding it",
    description:
      "A short note on keeping content, navigation, and visual systems separate while the site is still young.",
    date: "2026-06-30",
    readingTime: "4 min",
    status: "draft",
    tags: ["Architecture", "Design System"],
  },
  {
    title: "A calmer blog model for multilingual sites",
    description:
      "Why this blog starts as a single-language space before adding translated article mappings.",
    date: "2026-06-30",
    readingTime: "3 min",
    status: "planned",
    tags: ["Writing", "i18n"],
  },
];

export const writingsCopy = {
  eyebrow: "Writings",
  title: "Notes first, translations later.",
  intro:
    "This section starts as a single-language writing space so the blog model can stay simple while the rest of the site settles.",
  languageNote:
    "For now, language switching keeps the page shell localized, but blog entries are maintained as one primary stream.",
  emptyTitle: "More notes are being shaped.",
  emptyText:
    "The first version keeps the surface honest: a small list, clear status, and no premature CMS or translation machinery.",
};
