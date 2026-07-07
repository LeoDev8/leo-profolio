"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { PhotoWork } from "@/content/photos";
import { encodePhotoId } from "@/libs/photo-id";

type PhotoViewerProps = {
  photos: PhotoWork[];
  initialIndex: number;
  lang: string;
  closeHref: string;
  missingImage: string;
};

function getExposureText(photo: PhotoWork) {
  const { aperture, focalLength, iso, shutter } = photo.exposure;
  return [focalLength, aperture, shutter, `ISO${iso}`].filter(Boolean).join(" ");
}

function getPhotoContext(photo: PhotoWork) {
  return [photo.title, photo.location, photo.date].filter(Boolean).join(" · ");
}

export default function PhotoViewer({
  photos,
  initialIndex,
  lang,
  closeHref,
  missingImage,
}: PhotoViewerProps) {
  const router = useRouter();
  const [photoIndex, setPhotoIndex] = useState(initialIndex);
  const [visibleSlug, setVisibleSlug] = useState(photos[initialIndex]?.slug ?? "");
  const photoCount = photos.length;
  const photo = photos[photoIndex] ?? photos[0];
  const exposureText = getExposureText(photo);
  const photoContext = getPhotoContext(photo);
  const photoHref = useCallback(
    (targetPhoto: PhotoWork) => `/${lang}/photos/${encodePhotoId(targetPhoto.slug)}`,
    [lang],
  );
  const previousIndex = (photoIndex - 1 + photoCount) % photoCount;
  const nextIndex = (photoIndex + 1) % photoCount;
  const previousPhoto = photos[previousIndex];
  const nextPhoto = photos[nextIndex];

  const updatePhoto = useCallback(
    (nextPhotoIndex: number, shouldPushState = true) => {
      const normalizedIndex = (nextPhotoIndex + photoCount) % photoCount;
      const nextPhoto = photos[normalizedIndex];

      if (!nextPhoto) {
        return;
      }

      setPhotoIndex(normalizedIndex);
      setVisibleSlug(nextPhoto.slug);

      if (shouldPushState) {
        window.history.pushState(null, "", photoHref(nextPhoto));
      }
    },
    [photoCount, photoHref, photos],
  );

  useEffect(() => {
    const imagesToWarm = [previousPhoto, nextPhoto, photo].filter(
      (targetPhoto): targetPhoto is PhotoWork => Boolean(targetPhoto?.src),
    );

    imagesToWarm.forEach((targetPhoto) => {
      const image = new Image();
      image.decoding = "async";
      image.src = targetPhoto.src!;
      void image.decode?.().catch(() => undefined);
    });
  }, [nextPhoto, photo, previousPhoto]);

  useEffect(() => {
    const handlePopState = () => {
      const currentPath = window.location.pathname;
      const nextPhotoIndex = photos.findIndex(
        (targetPhoto) => currentPath === photoHref(targetPhoto),
      );

      if (nextPhotoIndex >= 0) {
        updatePhoto(nextPhotoIndex, false);
        return;
      }

      if (currentPath === closeHref) {
        router.replace(closeHref, { scroll: false });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [closeHref, photoHref, photos, router, updatePhoto]);

  if (!photo) {
    return null;
  }

  const goToPreviousPhoto = () => updatePhoto(previousIndex);
  const goToNextPhoto = () => updatePhoto(nextIndex);

  return (
    <div className="photo-viewer-enter fixed inset-0 z-[999] flex min-h-dvh items-center justify-center overflow-hidden bg-background/44 px-3 py-4 text-white shadow-glass backdrop-blur-2xl sm:px-6 sm:py-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,color-mix(in_srgb,var(--accent)_30%,transparent),transparent_30rem),radial-gradient(circle_at_78%_88%,color-mix(in_srgb,var(--surface-muted)_44%,transparent),transparent_34rem),linear-gradient(135deg,rgb(255_255_255/0.14),rgb(255_255_255/0.03)_36%,rgb(0_0_0/0.18))]" />
      <div className="pointer-events-none absolute inset-0 border border-white/12 bg-glass/52 shadow-[inset_0_1px_0_rgb(255_255_255/0.22),inset_0_-1px_0_rgb(255_255_255/0.08)]" />

      <Link
        href={closeHref}
        scroll={false}
        aria-label="Close photo viewer"
        className="absolute left-4 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-black/24 text-white shadow-glass backdrop-blur-xl transition hover:border-accent hover:bg-accent/14 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:left-6 sm:top-6"
      >
        <X aria-hidden="true" className="h-5 w-5" />
      </Link>

      <button
        type="button"
        onClick={goToPreviousPhoto}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/22 text-white shadow-glass backdrop-blur-xl transition hover:border-accent hover:bg-accent/14 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex lg:left-8"
      >
        <ChevronLeft aria-hidden="true" className="h-7 w-7" />
      </button>

      <button
        type="button"
        onClick={goToNextPhoto}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/22 text-white shadow-glass backdrop-blur-xl transition hover:border-accent hover:bg-accent/14 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex lg:right-8"
      >
        <ChevronRight aria-hidden="true" className="h-7 w-7" />
      </button>

      <div className="relative z-10 flex h-[min(86dvh,54rem)] w-full max-w-[min(88vw,82rem)] flex-col rounded-lg border border-white/20 bg-black/18 p-2 shadow-[0_32px_120px_rgb(0_0_0/0.34),inset_0_1px_0_rgb(255_255_255/0.18)] backdrop-blur-xl sm:p-3">
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-md bg-black/12">
          <div className="relative flex h-full w-full items-center justify-center">
            {photo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={visibleSlug}
                src={photo.src}
                alt={photo.alt}
                draggable={false}
                onLoad={(event) => {
                  void event.currentTarget.decode?.().catch(() => undefined);
                }}
                className="photo-viewer-image-enter max-h-full max-w-full select-none object-contain shadow-[0_24px_88px_rgb(0_0_0/0.38)]"
              />
            ) : (
              <div
                key={visibleSlug}
                className="photo-viewer-image-enter flex aspect-[4/3] w-full max-w-3xl items-center justify-center rounded-md border border-white/20 bg-white/10 px-6 text-center text-sm font-medium text-white/78 shadow-glass backdrop-blur-xl"
              >
                {missingImage}
              </div>
            )}
          </div>
        </div>

        <div className="mt-2 grid gap-2 rounded-md border border-white/14 bg-black/18 px-3 py-3 shadow-glass-inner sm:mt-3 sm:grid-cols-[1fr_auto] sm:items-end sm:px-4">
          <div className="min-w-0 text-center sm:text-left">
            <p className="truncate text-base font-semibold leading-tight text-white sm:text-lg">
              {photo.title}
            </p>
            <p className="mt-1 truncate text-xs font-medium text-white/58 sm:text-sm">
              {photoContext}
            </p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-xs font-semibold text-accent sm:text-sm">
              {photoIndex + 1} / {photoCount}
            </p>
            {exposureText && (
              <p className="mt-1 truncate text-xs font-medium text-white/72 sm:text-sm">
                {exposureText}
              </p>
            )}
          </div>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2 sm:hidden">
          <button
            type="button"
            onClick={goToPreviousPhoto}
            aria-label="Previous photo"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white shadow-glass-inner transition active:border-accent active:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goToNextPhoto}
            aria-label="Next photo"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white shadow-glass-inner transition active:border-accent active:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
