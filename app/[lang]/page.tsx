import Image from "next/image";

import SectionShell from "@/components/ui/surface/section-shell";
import { fallbackHomeCopy, homeCopy } from "@/content/home";

type HomePageProps = {
  params: Promise<{ lang: string }>;
};

export default async function Home({ params }: HomePageProps) {
  const { lang } = await params;
  const pageCopy =
    lang in homeCopy ? homeCopy[lang as keyof typeof homeCopy] : fallbackHomeCopy;

  return (
    <div className="page-enter min-h-screen pt-24">
      <SectionShell className="flex min-h-[calc(100vh-6rem)] items-center justify-center pb-20">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          <div className="relative mb-8 w-full max-w-[9rem] sm:max-w-[11rem]">
            <div className="relative aspect-[5/5] overflow-hidden rounded-full border border-glass-border bg-glass shadow-glass">
              <Image
                src="/avatar/leo-avatar-brush.svg"
                alt={pageCopy.photoAlt}
                fill
                priority
                className="object-contain p-4 sm:p-5"
                sizes="(min-width: 640px) 11rem, 9rem"
              />
            </div>
          </div>

          <div className="max-w-2xl">
            <p className="text-sm font-medium text-accent">{pageCopy.greeting}</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.98] text-foreground sm:text-7xl">
              {pageCopy.title}
            </h1>
            <div className="mt-8 space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>{pageCopy.intro}</p>
              <p>{pageCopy.bio}</p>
            </div>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
