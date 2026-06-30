import "server-only";

import { isDatabaseConfigured, getMysqlPool } from "@/libs/db/mysql";
import { photoWorks, type PhotoWork } from "@/content/photos";

type PhotoWorkRow = {
  slug: string;
  title: string;
  location: string;
  captured_at: string;
  orientation: PhotoWork["orientation"];
  src: string | null;
  alt: string;
  shutter: string;
  aperture: string;
  iso: string;
  focal_length: string | null;
  featured: 0 | 1 | boolean;
};

function shouldFallbackToLocal() {
  return process.env.DATABASE_FALLBACK_TO_LOCAL !== "false";
}

function rowToPhotoWork(row: PhotoWorkRow): PhotoWork {
  return {
    slug: row.slug,
    title: row.title,
    location: row.location,
    date: row.captured_at,
    orientation: row.orientation,
    featured: Boolean(row.featured),
    src: row.src ?? undefined,
    alt: row.alt,
    exposure: {
      shutter: row.shutter,
      aperture: row.aperture,
      iso: row.iso,
      focalLength: row.focal_length ?? undefined,
    },
  };
}

export async function getPhotoWorks(): Promise<PhotoWork[]> {
  if (!isDatabaseConfigured()) {
    return photoWorks;
  }

  try {
    const [rows] = await getMysqlPool().query<PhotoWorkRow[]>(
      `SELECT
        slug,
        title,
        location,
        captured_at,
        orientation,
        src,
        alt,
        shutter,
        aperture,
        iso,
        focal_length,
        featured
      FROM photo_works
      WHERE published = TRUE
      ORDER BY featured DESC, sort_order ASC, id ASC`,
    );

    if (rows.length === 0 && shouldFallbackToLocal()) {
      return photoWorks;
    }

    return rows.map(rowToPhotoWork);
  } catch (error) {
    if (shouldFallbackToLocal()) {
      console.warn("Falling back to local photo data.", error);
      return photoWorks;
    }

    throw error;
  }
}
