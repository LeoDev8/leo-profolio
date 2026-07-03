import photoSeed from "@/db/seed/photos.json";

export type PhotoExposure = {
  shutter: string;
  aperture: string;
  iso: string;
  focalLength?: string;
};

export type PhotoWork = {
  slug: string;
  title: string;
  location: string;
  date: string;
  orientation: "portrait" | "landscape" | "square";
  featured?: boolean;
  src?: string;
  alt: string;
  exposure: PhotoExposure;
};

export type PhotoCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  allFilterLabel: string;
  missingImage: string;
};

export const photoCopy = {
  zh: {
    eyebrow: "Photos",
    title: "摄影作品",
    intro:
      "把照片按画面比例自然铺开，保留最必要的拍摄参数，让光线、色彩和构图先说话。",
    allFilterLabel: "全部",
    missingImage: "等待放入成片",
  },
  en: {
    eyebrow: "Photos",
    title: "Photography",
    intro:
      "A quiet photo wall arranged by each frame's natural proportion, with only the essential camera settings kept below the image.",
    allFilterLabel: "All",
    missingImage: "Photo export pending",
  },
  hk: {
    eyebrow: "Photos",
    title: "攝影作品",
    intro:
      "把照片按畫面比例自然鋪開，保留最必要的拍攝參數，讓光線、色彩和構圖先說話。",
    allFilterLabel: "全部",
    missingImage: "等待放入成片",
  },
  jp: {
    eyebrow: "Photos",
    title: "写真作品",
    intro:
      "写真それぞれの比率を活かして並べ、必要な撮影設定だけを下に添えた静かなギャラリーです。",
    allFilterLabel: "All",
    missingImage: "写真の追加待ち",
  },
} satisfies Record<string, PhotoCopy>;

export const fallbackPhotoCopy = photoCopy.en;

function normalizePhotoWork(photo: (typeof photoSeed)[number]): PhotoWork {
  return {
    ...photo,
    src: photo.src ?? undefined,
    orientation: photo.orientation as PhotoWork["orientation"],
  };
}

export const photoWorks = photoSeed.map(normalizePhotoWork);
