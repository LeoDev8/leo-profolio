import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenText,
  Camera,
  Code2,
  Mail,
  Plane,
} from "lucide-react";

type HomePageProps = {
  params: Promise<{ lang: string }>;
};

const copy = {
  zh: {
    eyebrow: "Leo 的个人站",
    title: "笔记、项目、影像与飞行记录。",
    intro:
      "这里会收纳我的博客笔记、前端与全栈项目、摄影作品，以及之后可能持续更新的 DCS World 任务复盘。",
    current: "当前建设中",
    currentText:
      "我正在把这个站点整理成一个简洁、长期可维护的个人内容入口。",
    quickTitle: "快速进入",
    featuredTitle: "近期内容入口",
    connectTitle: "保持联系",
    connectText:
      "如果你想聊项目、设计、开发、摄影，或只是交换一些飞行任务故事，可以从这里找到我。",
    contactCta: "联系我",
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
        href: "/works",
        label: "Works",
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
      "A quiet home for my writing, frontend and full-stack projects, photography, and future DCS World mission notes.",
    current: "Now building",
    currentText:
      "I am shaping this site into a clean, durable entry point for the things I make and learn.",
    quickTitle: "Quick paths",
    featuredTitle: "Recent gateways",
    connectTitle: "Stay in touch",
    connectText:
      "For projects, design, development, photography, or a good flight-mission story, this is where to reach me.",
    contactCta: "Contact me",
    entries: [
      {
        title: "Writings",
        description: "Technical notes, learning logs, tool notes, and longer observations.",
        href: "/writings",
        label: "Writings",
        icon: BookOpenText,
      },
      {
        title: "Works",
        description: "Frontend experiments, full-stack apps, component practice, and build notes.",
        href: "/works",
        label: "Works",
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
};

const fallbackCopy = copy.en;

export default async function Home({ params }: HomePageProps) {
  const { lang } = await params;
  const pageCopy = lang in copy ? copy[lang as keyof typeof copy] : fallbackCopy;

  const localizedHref = (href: string) =>
    `/${lang}${href === "/" ? "" : href}`;

  return (
    <div className="min-h-screen px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-sm font-medium text-accent">{pageCopy.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            {pageCopy.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {pageCopy.intro}
          </p>
        </div>

        <aside className="border-l-2 border-accent pl-5">
          <p className="text-sm font-medium text-foreground">
            {pageCopy.current}
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            {pageCopy.currentText}
          </p>
        </aside>
      </section>

      <section className="mx-auto mt-14 max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold text-foreground">
            {pageCopy.quickTitle}
          </h2>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {pageCopy.entries.map((entry) => {
            const Icon = entry.icon;

            return (
              <Link
                key={entry.label}
                href={localizedHref(entry.href)}
                className="group flex min-h-52 flex-col justify-between rounded-lg border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-muted text-accent">
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <ArrowUpRight
                      className="text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      size={18}
                      strokeWidth={1.8}
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {entry.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {entry.description}
                  </p>
                </div>
                <p className="mt-6 text-xs font-medium uppercase text-accent">
                  {entry.label}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {pageCopy.featuredTitle}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">
            {pageCopy.currentText}
          </p>
        </div>

        <div className="grid gap-3">
          {pageCopy.highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <p className="text-xs font-medium uppercase text-accent">
                {item.type}
              </p>
              <h3 className="mt-3 text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl rounded-lg border border-border bg-surface-muted px-5 py-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-6">
        <div>
          <div className="flex items-center gap-3 text-accent">
            <Mail size={18} strokeWidth={1.8} />
            <h2 className="text-lg font-semibold text-foreground">
              {pageCopy.connectTitle}
            </h2>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            {pageCopy.connectText}
          </p>
        </div>

        <Link
          href={localizedHref("/contact")}
          className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-opacity duration-300 hover:opacity-90 sm:mt-0"
        >
          {pageCopy.contactCta}
        </Link>
      </section>
    </div>
  );
}
