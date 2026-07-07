"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { PhotoWork } from "@/content/photos";
import { encodePhotoId } from "@/libs/photo-id";
import { cn } from "@/libs/utils";

type PhotosGalleryProps = {
  lang: string;
  photos: PhotoWork[];
  allFilterLabel: string;
  missingImage: string;
};

function getExposureText(photo: PhotoWork) {
  const { aperture, focalLength, iso, shutter } = photo.exposure;
  return [focalLength, aperture, shutter, `ISO${iso}`].filter(Boolean).join(" ");
}

function getPhotoContext(photo: PhotoWork) {
  return [photo.title, photo.location, photo.date].filter(Boolean).join(" · ");
}

export default function PhotosGallery({
  lang,
  photos,
  allFilterLabel,
  missingImage,
}: PhotosGalleryProps) {
  const filters = useMemo(
    () => [
      allFilterLabel,
      ...Array.from(new Set(photos.map((photo) => photo.location))).filter(Boolean),
    ],
    [allFilterLabel, photos],
  );
  const [activeFilter, setActiveFilter] = useState(allFilterLabel);
  const visiblePhotos =
    activeFilter === allFilterLabel
      ? photos
      : photos.filter((photo) => photo.location === activeFilter);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                isActive
                  ? "border-accent bg-accent text-accent-foreground shadow-glass-inner"
                  : "border-glass-border bg-glass text-muted hover:border-accent hover:text-foreground",
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {visiblePhotos.map((photo, index) => (
          <PhotoPrint
            key={photo.slug}
            photo={photo}
            missingImage={missingImage}
            priority={index < 3}
            href={`/${lang}/photos/${encodePhotoId(photo.slug)}`}
          />
        ))}
      </div>
    </div>
  );
}

function PhotoPrint({
  photo,
  missingImage,
  priority,
  href,
}: {
  photo: PhotoWork;
  missingImage: string;
  priority: boolean;
  href: string;
}) {
  const exposureText = getExposureText(photo);
  const photoContext = getPhotoContext(photo);

  return (
    <figure className="group mb-5 inline-block w-full break-inside-avoid overflow-hidden rounded-lg border border-glass-border bg-glass p-1.5 shadow-glass transition duration-300 hover:-translate-y-1 hover:border-accent/45 hover:bg-glass-strong">
      <Link
        href={href}
        scroll={false}
        aria-label={`Open ${photo.title}`}
        className="block w-full cursor-zoom-in rounded-md text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <div className="relative overflow-hidden rounded-md bg-surface-muted">
          {photo.src ? (
            // Native image sizing preserves each file's real aspect ratio for the masonry flow.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo.src}
              alt={photo.alt}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              className="h-auto w-full select-none"
            />
          ) : (
            <div className="flex aspect-[4/3] w-full items-center justify-center bg-surface-muted px-6 text-center text-sm font-medium text-muted">
              {missingImage}
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-black/24 opacity-100 transition duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100" />

          {(exposureText || photoContext) && (
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/78 via-black/38 to-transparent px-3 pb-3 pt-16 opacity-100 backdrop-blur-[1px] transition duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
              {exposureText && (
                <p className="truncate text-center text-xs font-semibold leading-tight text-white/94 sm:text-sm">
                  {exposureText}
                </p>
              )}
              {photoContext && (
                <p className="mt-1 truncate text-center text-[11px] font-medium text-white/62 sm:text-xs">
                  {photoContext}
                </p>
              )}
            </figcaption>
          )}
        </div>
      </Link>
    </figure>
  );
}
