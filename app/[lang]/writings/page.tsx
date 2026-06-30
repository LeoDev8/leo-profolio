import { BookOpenText, Languages } from "lucide-react";

import GlassPanel from "@/components/ui/surface/glass-panel";
import SectionShell from "@/components/ui/surface/section-shell";
import { writingPosts, writingsCopy } from "@/content/writings";

export default function WritingsPage() {
  return (
    <div className="page-enter min-h-screen pb-16 pt-24">
      <SectionShell
        eyebrow={writingsCopy.eyebrow}
        title={writingsCopy.title}
        description={writingsCopy.intro}
      >
        <GlassPanel className="p-5">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-glass-border bg-glass-highlight text-accent shadow-glass-inner">
              <Languages size={20} strokeWidth={1.8} />
            </span>
            <p className="text-sm leading-7 text-muted">
              {writingsCopy.languageNote}
            </p>
          </div>
        </GlassPanel>

        <div className="mt-6 grid gap-4">
          {writingPosts.map((post) => (
            <GlassPanel key={post.title} as="article" hover className="p-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-accent">
                    <BookOpenText size={15} strokeWidth={1.8} />
                    <span>{post.status}</span>
                    <span aria-hidden="true">/</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-foreground">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {post.description}
                  </p>
                </div>

                <time className="shrink-0 text-sm text-muted" dateTime={post.date}>
                  {post.date}
                </time>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-glass-border bg-glass-highlight px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </GlassPanel>
          ))}
        </div>

        <GlassPanel className="mt-6 p-5">
          <h2 className="text-base font-semibold text-foreground">
            {writingsCopy.emptyTitle}
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            {writingsCopy.emptyText}
          </p>
        </GlassPanel>
      </SectionShell>
    </div>
  );
}
