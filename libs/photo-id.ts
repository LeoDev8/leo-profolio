const PHOTO_ID_PREFIX = "p";

export function encodePhotoId(slug: string) {
  const slugBytes = new TextEncoder().encode(slug);
  const encodedSlug = Array.from(slugBytes, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");

  return `${PHOTO_ID_PREFIX}${encodedSlug}`;
}

export function decodePhotoId(photoId: string) {
  if (!photoId.startsWith(PHOTO_ID_PREFIX)) {
    return null;
  }

  const encodedSlug = photoId.slice(PHOTO_ID_PREFIX.length);

  if (!encodedSlug || encodedSlug.length % 2 !== 0 || /[^0-9a-f]/i.test(encodedSlug)) {
    return null;
  }

  try {
    const slugBytePairs = encodedSlug.match(/.{2}/g);

    if (!slugBytePairs) {
      return null;
    }

    const slugBytes = slugBytePairs.map((byte) => parseInt(byte, 16));
    const slug = new TextDecoder("utf-8", { fatal: true }).decode(
      new Uint8Array(slugBytes),
    );

    return slug || null;
  } catch {
    return null;
  }
}
