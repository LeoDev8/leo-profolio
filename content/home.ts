import { BookOpenText, Camera, Code2, type LucideIcon } from "lucide-react";

export type HomeEntry = {
  title: string;
  description: string;
  href: string;
  label: string;
  icon: LucideIcon;
};

export type HomeCopy = {
  greeting: string;
  title: string;
  intro: string;
  bio: string;
  photoAlt: string;
  entries: HomeEntry[];
};

export const homeCopy = {
  zh: {
    greeting: "你好，我是",
    title: "Leo",
    intro:
      "我是一名专注于网页体验与数字产品的开发者，喜欢把想法整理成清晰、好用的作品。",
    bio: "这里记录我的项目、文字和摄影，也记录持续学习与构建的过程。",
    photoAlt: "Leo 的个人头像",
    entries: [
      {
        title: "博客随笔",
        description: "技术记录、学习笔记、工具使用心得和长期观察。",
        href: "/writings",
        label: "Writings",
        icon: BookOpenText,
      },
      {
        title: "项目作品",
        description: "前端实验、全栈应用、组件练习和构建过程复盘。",
        href: "/projects",
        label: "Projects",
        icon: Code2,
      },
      {
        title: "摄影作品",
        description: "城市、旅行、日常片段，以及之后按主题整理的影像集。",
        href: "/photos",
        label: "Photos",
        icon: Camera,
      },
    ],
  },
  en: {
    greeting: "Hi, I'm",
    title: "Leo",
    intro:
      "I'm a developer focused on web experiences and digital products, turning ideas into clear and useful work.",
    bio: "This is where I collect projects, writing, and photography, along with the process of learning and building.",
    photoAlt: "Leo's profile portrait",
    entries: [
      {
        title: "Writings",
        description: "Technical notes, learning logs, tool notes, and longer observations.",
        href: "/writings",
        label: "Writings",
        icon: BookOpenText,
      },
      {
        title: "Projects",
        description: "Frontend experiments, full-stack apps, component practice, and build notes.",
        href: "/projects",
        label: "Projects",
        icon: Code2,
      },
      {
        title: "Photography",
        description: "Cities, travel, everyday fragments, and future themed photo sets.",
        href: "/photos",
        label: "Photos",
        icon: Camera,
      },
    ],
  },
} satisfies Record<string, HomeCopy>;

export const fallbackHomeCopy = homeCopy.en;
