import Link from "next/link";

import AnimatedLinkCard from "@/components/ui/surface/animated-link-card";
import GlassPanel from "@/components/ui/surface/glass-panel";
import SectionShell from "@/components/ui/surface/section-shell";
import {
  fallbackHomeCopy,
  homeContactIcon,
  homeCopy,
  homeSystemIcon,
} from "@/content/home";

type HomePageProps = {
  params: Promise<{ lang: string }>;
};

export default async function Home({ params }: HomePageProps) {
  const { lang } = await params;
  const pageCopy = lang in homeCopy ? homeCopy[lang as keyof typeof homeCopy] : fallbackHomeCopy;
  const SystemIcon = homeSystemIcon;
  const ContactIcon = homeContactIcon;

  const localizedHref = (href: string) =>
    `/${lang}${href === "/" ? "" : href}`;

  return (
    <div className="page-enter min-h-screen pb-16 pt-24">
      <SectionShell className="grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-end">
        <div>
          <p className="text-sm font-medium text-accent">{pageCopy.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            {pageCopy.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {pageCopy.intro}
          </p>
        </div>

        <GlassPanel className="p-5">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-glass-border bg-glass-highlight text-accent shadow-glass-inner">
              <SystemIcon size={20} strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">
                {pageCopy.current}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                {pageCopy.currentText}
              </p>
            </div>
          </div>
        </GlassPanel>
      </SectionShell>

      <SectionShell className="mt-14" title={pageCopy.quickTitle}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {pageCopy.entries.map((entry) => (
            <AnimatedLinkCard
              key={entry.label}
              href={localizedHref(entry.href)}
              title={entry.title}
              description={entry.description}
              label={entry.label}
              icon={entry.icon}
            />
          ))}
        </div>
      </SectionShell>

      <SectionShell className="mt-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <GlassPanel className="p-5">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-glass-border bg-glass-highlight text-accent shadow-glass-inner">
                <SystemIcon size={20} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                  System
                </p>
                <h2 className="mt-3 text-xl font-semibold text-foreground">
                  {pageCopy.systemTitle}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {pageCopy.systemText}
                </p>
              </div>
            </div>
          </GlassPanel>

          <div className="grid gap-3">
            {pageCopy.highlights.map((item) => (
              <GlassPanel key={item.title} as="article" className="p-5">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                  {item.type}
                </p>
                <h3 className="mt-3 text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {item.description}
                </p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell className="mt-16">
        <GlassPanel className="px-5 py-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-6">
          <div>
            <div className="flex items-center gap-3 text-accent">
              <ContactIcon size={18} strokeWidth={1.8} />
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
            className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-opacity duration-motion hover:opacity-90 sm:mt-0"
          >
            {pageCopy.contactCta}
          </Link>
        </GlassPanel>
      </SectionShell>
    </div>
  );
}
