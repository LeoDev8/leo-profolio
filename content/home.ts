import {
  BookOpenText,
  Camera,
  Code2,
  Mail,
  Plane,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type HomeEntry = {
  title: string;
  description: string;
  href: string;
  label: string;
  icon: LucideIcon;
};

export type HomeHighlight = {
  type: string;
  title: string;
  description: string;
};

export type HomeCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  current: string;
  currentText: string;
  quickTitle: string;
  featuredTitle: string;
  connectTitle: string;
  connectText: string;
  contactCta: string;
  systemTitle: string;
  systemText: string;
  entries: HomeEntry[];
  highlights: HomeHighlight[];
};

export const homeCopy = {
  zh: {
    eyebrow: "Leo 的个人站",
    title: "笔记、项目、影像与飞行记录。",
    intro:
      "这里会收纳我的博客笔记、前端与全栈项目、摄影作品，以及之后持续更新的 DCS World 任务复盘。",
    current: "当前建设中",
    currentText:
      "第一阶段先把内容结构、视觉基调和长期维护方式整理稳定。",
    quickTitle: "快速进入",
    featuredTitle: "内容方向",
    connectTitle: "保持联系",
    connectText:
      "如果你想聊项目、设计、开发、摄影，或只是交换一些飞行任务故事，可以从这里找到我。",
    contactCta: "联系我",
    systemTitle: "渐进式改造",
    systemText:
      "Blog 先保持单语言，视觉先建立玻璃质感组件和轻量动效，后续页面按同一系统迁移。",
    entries: [
      {
        title: "随笔与笔记",
        description: "技术记录、学习笔记、工具使用心得和一些长期观察。",
        href: "/writings",
        label: "Writings",
        icon: BookOpenText,
      },
      {
        title: "项目作品",
        description: "小型前端实验、全栈应用、组件练习和可以复盘的构建过程。",
        href: "/projects",
        label: "Projects",
        icon: Code2,
      },
      {
        title: "摄影作品",
        description: "城市、旅行、日常片段，以及之后可以按主题整理的影像集。",
        href: "/photos",
        label: "Photos",
        icon: Camera,
      },
      {
        title: "DCS 飞行记录",
        description: "任务日期、机型、地图、任务结果和飞行复盘的专属空间。",
        href: "/flights",
        label: "Flights",
        icon: Plane,
      },
    ],
    highlights: [
      {
        type: "Writing",
        title: "把知识整理成可回看的笔记",
        description: "用于沉淀学习过程，而不是只留下零散的临时记录。",
      },
      {
        type: "Project",
        title: "展示真实的小项目和构建思路",
        description: "每个项目都可以补充技术栈、截图、链接和复盘。",
      },
      {
        type: "Flight Log",
        title: "为 DCS World 留一个特别入口",
        description: "以后可以做成带机型、地图、任务类型和结果标签的日志。",
      },
    ],
  },
  en: {
    eyebrow: "Leo's personal site",
    title: "Notes, projects, photos, and flight logs.",
    intro:
      "A quiet home for writing, frontend and full-stack projects, photography, and future DCS World mission notes.",
    current: "Now building",
    currentText:
      "The first pass focuses on durable structure, a clearer visual language, and easier long-term maintenance.",
    quickTitle: "Quick paths",
    featuredTitle: "Content directions",
    connectTitle: "Stay in touch",
    connectText:
      "For projects, design, development, photography, or a good flight-mission story, this is where to reach me.",
    contactCta: "Contact me",
    systemTitle: "Progressive redesign",
    systemText:
      "The blog stays single-language for now, while the visual layer gains glass surfaces, reusable panels, and light motion.",
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
      {
        title: "DCS Flight Logs",
        description: "Mission dates, aircraft, maps, outcomes, and after-action notes.",
        href: "/flights",
        label: "Flights",
        icon: Plane,
      },
    ],
    highlights: [
      {
        type: "Writing",
        title: "Turn learning into notes worth revisiting",
        description: "A place for durable knowledge instead of scattered temporary scraps.",
      },
      {
        type: "Project",
        title: "Show real projects and the thinking behind them",
        description: "Each work can grow into screenshots, tech stack, links, and retrospectives.",
      },
      {
        type: "Flight Log",
        title: "Give DCS World its own corner",
        description: "Later this can become a log with aircraft, map, mission type, and result tags.",
      },
    ],
  },
} satisfies Record<string, HomeCopy>;

export const fallbackHomeCopy = homeCopy.en;
export const homeSystemIcon = Sparkles;
export const homeContactIcon = Mail;
