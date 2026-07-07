import { notFound } from "next/navigation";

import PhotoViewer from "@/components/photos/photo-viewer";
import { fallbackPhotoCopy, photoCopy } from "@/content/photos";
import { decodePhotoId } from "@/libs/photo-id";
import { getPhotoWorks } from "@/libs/photos";

type PhotoModalPageProps = {
  params: Promise<{ lang: string; photoId: string }>;
};

export default async function Page({ params }: PhotoModalPageProps) {
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

  const pageCopy =
    lang in photoCopy ? photoCopy[lang as keyof typeof photoCopy] : fallbackPhotoCopy;

  return (
    <PhotoViewer
      key={photos[photoIndex].slug}
      photos={photos}
      initialIndex={photoIndex}
      lang={lang}
      closeHref={`/${lang}/photos`}
      missingImage={pageCopy.missingImage}
    />
  );
}
