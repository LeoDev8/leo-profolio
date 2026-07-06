import PhotosGallery from "@/components/photos/photos-gallery";
import { fallbackPhotoCopy, photoCopy } from "@/content/photos";
import { getPhotoWorks } from "@/libs/photos";

type PhotosPageProps = {
  params: Promise<{ lang: string }>;
};

export default async function Page({ params }: PhotosPageProps) {
  const { lang } = await params;
  const pageCopy =
    lang in photoCopy ? photoCopy[lang as keyof typeof photoCopy] : fallbackPhotoCopy;
  const photos = await getPhotoWorks();

  return (
    <div className="page-enter min-h-screen pb-16 pt-24">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent">{pageCopy.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            {pageCopy.title}
          </h1>
          <p className="mt-5 text-base leading-8 text-muted">{pageCopy.intro}</p>
        </div>

        <PhotosGallery
          lang={lang}
          photos={photos}
          allFilterLabel={pageCopy.allFilterLabel}
          missingImage={pageCopy.missingImage}
        />
      </section>
    </div>
  );
}
