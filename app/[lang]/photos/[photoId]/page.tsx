import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";

import type { PhotoWork } from "@/content/photos";
import { fallbackPhotoCopy, photoCopy } from "@/content/photos";
import { decodePhotoId, encodePhotoId } from "@/libs/photo-id";
import { getPhotoWorks } from "@/libs/photos";

type PhotoDetailPageProps = {
  params: Promise<{ lang: string; photoId: string }>;
};

function getExposureText(photo: PhotoWork) {
  const { aperture, focalLength, iso, shutter } = photo.exposure;
  return [focalLength, aperture, shutter, `ISO${iso}`].filter(Boolean).join(" ");
}

function getPhotoContext(photo: PhotoWork) {
  return [photo.title, photo.location, photo.date].filter(Boolean).join(" · ");
}

function getPhotoHref(lang: string, photo: PhotoWork) {
  return `/${lang}/photos/${encodePhotoId(photo.slug)}`;
}

export default async function Page({ params }: PhotoDetailPageProps) {
  const { lang, photoId } = await params;
  const slug = decodePhotoId(photoId);

  if (!slug) {
    notFound();
  }

  const photos = await getPhotoWorks();
  const photoIndex = photos.findIndex((photo) => photo.slug === slug);

  if (photoIndex < 0) {
    notFound();
  }

  const photo = photos[photoIndex];
  const previousPhoto = photos[(photoIndex - 1 + photos.length) % photos.length];
  const nextPhoto = photos[(photoIndex + 1) % photos.length];
  const pageCopy =
    lang in photoCopy ? photoCopy[lang as keyof typeof photoCopy] : fallbackPhotoCopy;
  const exposureText = getExposureText(photo);
  const photoContext = getPhotoContext(photo);

  return (
    <div className="fixed inset-0 z-[999] flex min-h-dvh items-center justify-center bg-background/42 px-3 py-4 text-white shadow-glass backdrop-blur-2xl sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,color-mix(in_srgb,var(--accent)_30%,transparent),transparent_30rem),radial-gradient(circle_at_78%_88%,color-mix(in_srgb,var(--surface-muted)_44%,transparent),transparent_34rem),linear-gradient(135deg,rgb(255_255_255/0.14),rgb(255_255_255/0.03)_36%,rgb(0_0_0/0.18))]" />
      <div className="pointer-events-none absolute inset-0 border border-white/12 bg-glass/52 shadow-[inset_0_1px_0_rgb(255_255_255/0.22),inset_0_-1px_0_rgb(255_255_255/0.08)]" />

      <div className="relative z-10 flex h-full w-full max-w-[min(96vw,100rem)] flex-col">
        <div className="mb-3 flex items-center justify-between gap-3 rounded-lg border border-white/20 bg-black/18 px-3 py-2 shadow-glass-inner backdrop-blur-xl sm:mb-4 sm:px-4">
          <p className="text-xs font-semibold text-accent sm:text-sm">
            {photoIndex + 1} / {photos.length}
          </p>
          <div className="flex items-center gap-2">
            <Link
              href={`/${lang}/photos`}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 text-sm font-semibold text-white shadow-glass-inner transition hover:border-accent hover:bg-accent/14 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              <span className="hidden sm:inline">Back to photos</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <Link
              href={`/${lang}/photos`}
              aria-label="Close photo viewer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition hover:border-accent hover:bg-accent/14 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          <Link
            href={getPhotoHref(lang, previousPhoto)}
            aria-label="Previous photo"
            className="absolute left-1 z-20 hidden h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white shadow-glass backdrop-blur-xl transition hover:border-accent hover:bg-accent/14 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex lg:left-4"
          >
            <ChevronLeft aria-hidden="true" className="h-7 w-7" />
          </Link>

          <div className="flex h-full w-full items-center justify-center px-0 sm:px-20">
            {photo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo.src}
                alt={photo.alt}
                draggable={false}
                className="max-h-full max-w-full select-none rounded-md object-contain shadow-[0_32px_120px_rgb(0_0_0/0.46)]"
              />
            ) : (
              <div className="flex aspect-[4/3] w-full max-w-3xl items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 text-center text-sm font-medium text-white/78 shadow-glass backdrop-blur-xl">
                {pageCopy.missingImage}
              </div>
            )}
          </div>

          <Link
            href={getPhotoHref(lang, nextPhoto)}
            aria-label="Next photo"
            className="absolute right-1 z-20 hidden h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white shadow-glass backdrop-blur-xl transition hover:border-accent hover:bg-accent/14 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex lg:right-4"
          >
            <ChevronRight aria-hidden="true" className="h-7 w-7" />
          </Link>
        </div>

        <div className="mt-3 rounded-lg border border-white/20 bg-black/18 px-4 py-3 text-center shadow-glass backdrop-blur-xl sm:mt-4">
          {exposureText && (
            <p className="truncate text-sm font-semibold leading-tight text-white sm:text-base">
              {exposureText}
            </p>
          )}
          {photoContext && (
            <p className="mt-1 truncate text-xs font-medium text-white/58 sm:text-sm">
              {photoContext}
            </p>
          )}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:hidden">
          <Link
            href={getPhotoHref(lang, previousPhoto)}
            aria-label="Previous photo"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white shadow-glass-inner transition active:border-accent active:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </Link>
          <Link
            href={getPhotoHref(lang, nextPhoto)}
            aria-label="Next photo"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white shadow-glass-inner transition active:border-accent active:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
