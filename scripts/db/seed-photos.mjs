import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import mysql from "mysql2/promise";

import { getConnectionOptions } from "./config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const seedPath = path.resolve(__dirname, "../../db/seed/photos.json");
const photos = JSON.parse(await readFile(seedPath, "utf8"));
const connection = await mysql.createConnection(getConnectionOptions());

try {
  for (const [index, photo] of photos.entries()) {
    await connection.execute(
      `INSERT INTO photo_works (
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
        featured,
        published,
        sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        location = VALUES(location),
        captured_at = VALUES(captured_at),
        orientation = VALUES(orientation),
        src = VALUES(src),
        alt = VALUES(alt),
        shutter = VALUES(shutter),
        aperture = VALUES(aperture),
        iso = VALUES(iso),
        focal_length = VALUES(focal_length),
        featured = VALUES(featured),
        published = VALUES(published),
        sort_order = VALUES(sort_order)`,
      [
        photo.slug,
        photo.title,
        photo.location,
        photo.date,
        photo.orientation,
        photo.src,
        photo.alt,
        photo.exposure.shutter,
        photo.exposure.aperture,
        photo.exposure.iso,
        photo.exposure.focalLength ?? null,
        photo.featured ? 1 : 0,
        1,
        index + 1,
      ],
    );
  }

  console.log(`Seeded ${photos.length} photo works.`);
} finally {
  await connection.end();
}
