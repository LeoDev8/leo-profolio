import { Aperture, Camera, Copyright, ShieldCheck, Timer } from "lucide-react";
import Image from "next/image";

import GlassPanel from "@/components/ui/surface/glass-panel";
import SectionShell from "@/components/ui/surface/section-shell";
import {
  fallbackPhotoCopy,
  photoCopy,
  type PhotoWork,
} from "@/content/photos";
import { getPhotoWorks } from "@/libs/photos";
import { cn } from "@/libs/utils";

type PhotosPageProps = {
  params: Promise<{ lang: string }>;
};

const aspectClass = {
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
} satisfies Record<PhotoWork["orientation"], string>;

export default async function Page({ params }: PhotosPageProps) {
  const { lang } = await params;
  const pageCopy =
    lang in photoCopy ? photoCopy[lang as keyof typeof photoCopy] : fallbackPhotoCopy;
  const photos = await getPhotoWorks();
  const featuredPhoto = photos.find((photo) => photo.featured) ?? photos[0];
  const galleryPhotos = photos.filter((photo) => photo !== featuredPhoto);

  return (
    <div className="page-enter min-h-screen pb-16 pt-24">
      <SectionShell className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
        <div>
          <p className="text-sm font-medium text-accent">{pageCopy.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            {pageCopy.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted">
            {pageCopy.intro}
          </p>
        </div>

        <PhotoFrame
          photo={featuredPhoto}
          labels={pageCopy.exposureLabels}
          missingImage={pageCopy.missingImage}
          priority
          featured
        />
      </SectionShell>

      <SectionShell
        className="mt-16"
        title={pageCopy.galleryTitle}
        description={pageCopy.galleryDescription}
      >
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryPhotos.map((photo) => (
            <PhotoFrame
              key={photo.title}
              photo={photo}
              labels={pageCopy.exposureLabels}
              missingImage={pageCopy.missingImage}
              className="mb-5 break-inside-avoid"
            />
          ))}
        </div>
      </SectionShell>

      <SectionShell className="mt-14">
        <div className="grid gap-4 lg:grid-cols-2">
          <GlassPanel className="p-5">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-glass-border bg-glass-highlight text-accent shadow-glass-inner">
                <Copyright size={20} strokeWidth={1.8} />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {pageCopy.copyrightTitle}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {pageCopy.copyrightText}
                </p>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-5">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-glass-border bg-glass-highlight text-accent shadow-glass-inner">
                <ShieldCheck size={20} strokeWidth={1.8} />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {pageCopy.watermarkTitle}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {pageCopy.watermarkText}
                </p>
              </div>
            </div>
          </GlassPanel>
        </div>
      </SectionShell>
    </div>
  );
}

type PhotoFrameProps = {
  photo: PhotoWork;
  labels: (typeof fallbackPhotoCopy)["exposureLabels"];
  missingImage: string;
  className?: string;
  priority?: boolean;
  featured?: boolean;
};

function PhotoFrame({
  photo,
  labels,
  missingImage,
  className,
  priority = false,
  featured = false,
}: PhotoFrameProps) {
  return (
    <GlassPanel
      as="figure"
      hover
      className={cn("overflow-hidden p-2", className)}
    >
      <div
        className={cn(
          "group relative overflow-hidden rounded-lg bg-surface-muted",
          featured ? "aspect-[16/10] min-h-72" : aspectClass[photo.orientation],
        )}
      >
        {photo.src ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority={priority}
            draggable={false}
            sizes={
              featured
                ? "(min-width: 1024px) 680px, calc(100vw - 2rem)"
                : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, calc(100vw - 2rem)"
            }
            className="select-none object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,var(--surface-muted),var(--glass-highlight))] px-8 text-center">
            <Camera size={30} strokeWidth={1.6} className="text-accent" />
            <p className="text-sm font-medium text-foreground">{missingImage}</p>
            <p className="text-xs leading-6 text-muted">
              public/photos/{photo.slug}.jpg
            </p>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/62 via-black/22 to-transparent p-4 text-white">
          <figcaption className="min-w-0">
            <p className="truncate text-base font-semibold">{photo.title}</p>
            <p className="mt-1 truncate text-xs text-white/72">
              {photo.location} · {photo.date}
            </p>
          </figcaption>
          <span className="shrink-0 text-right text-[10px] uppercase tracking-[0.18em] text-white/70">
            Leo Photo
          </span>
        </div>
      </div>

      <ExposureBar photo={photo} labels={labels} />
    </GlassPanel>
  );
}

function ExposureBar({
  photo,
  labels,
}: {
  photo: PhotoWork;
  labels: (typeof fallbackPhotoCopy)["exposureLabels"];
}) {
  type ExposureItem = {
    label: string;
    value: string;
    icon: typeof Timer;
  };

  const items: ExposureItem[] = [
    {
      label: labels.shutter,
      value: photo.exposure.shutter,
      icon: Timer,
    },
    {
      label: labels.aperture,
      value: photo.exposure.aperture,
      icon: Aperture,
    },
    {
      label: labels.iso,
      value: photo.exposure.iso,
      icon: Camera,
    },
    photo.exposure.focalLength
      ? {
          label: labels.focalLength,
          value: photo.exposure.focalLength,
          icon: Camera,
        }
      : null,
  ].filter((item): item is ExposureItem => item !== null);

  return (
    <dl className="grid grid-cols-2 gap-2 px-2 py-3 sm:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="min-w-0 rounded-md border border-glass-border bg-glass-highlight px-2.5 py-2"
          >
            <dt className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
              <Icon size={12} strokeWidth={1.8} />
              <span className="truncate">{item.label}</span>
            </dt>
            <dd className="mt-1 truncate text-sm font-semibold text-foreground">
              {item.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
