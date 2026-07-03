"use client";

import { useMemo, useState } from "react";

import type { PhotoWork } from "@/content/photos";
import { cn } from "@/libs/utils";

type PhotosGalleryProps = {
  photos: PhotoWork[];
  allFilterLabel: string;
  missingImage: string;
};

function getExposureText(photo: PhotoWork) {
  const { aperture, focalLength, iso, shutter } = photo.exposure;
  return [focalLength, aperture, shutter, `ISO${iso}`].filter(Boolean).join(" ");
}

export default function PhotosGallery({
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
}: {
  photo: PhotoWork;
  missingImage: string;
  priority: boolean;
}) {
  const exposureText = getExposureText(photo);

  return (
    <figure className="group mb-5 inline-block w-full break-inside-avoid overflow-hidden rounded-lg border border-glass-border bg-glass p-1.5 shadow-glass transition duration-300 hover:-translate-y-1 hover:border-accent/45 hover:bg-glass-strong">
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

        {exposureText && (
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/84 via-background/54 to-transparent px-3 pb-3 pt-10 opacity-100 backdrop-blur-[1px] transition duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
            <p className="truncate text-center text-xs font-semibold leading-tight text-foreground/86 sm:text-sm">
              {exposureText}
            </p>
          </figcaption>
        )}
      </div>
    </figure>
  );
}
