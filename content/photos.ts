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
  galleryTitle: string;
  galleryDescription: string;
  copyrightTitle: string;
  copyrightText: string;
  watermarkTitle: string;
  watermarkText: string;
  missingImage: string;
  exposureLabels: {
    shutter: string;
    aperture: string;
    iso: string;
    focalLength: string;
  };
};

export const photoCopy = {
  zh: {
    eyebrow: "Photos",
    title: "摄影作品",
    intro:
      "这里会展示我已经在外部完成调色的成片。页面尽量克制，让色彩、光线和构图成为第一层信息。",
    galleryTitle: "Selected Frames",
    galleryDescription:
      "每张照片保留快门、光圈、ISO 和焦段信息，方便回看拍摄条件，也让作品展示更完整。",
    copyrightTitle: "版权保护",
    copyrightText:
      "建议网页端使用低到中等分辨率展示，并在作品数据中保留署名。明显水印适合发布预览图；正式作品页更推荐低调署名、禁用直接拖拽不是可靠保护，只能作为轻量提醒。",
    watermarkTitle: "水印策略",
    watermarkText:
      "当前采用角落署名式水印，不遮挡画面主体。真正用于社媒传播时，可以另外导出带明显水印的版本。",
    missingImage: "等待放入成片",
    exposureLabels: {
      shutter: "快门",
      aperture: "光圈",
      iso: "ISO",
      focalLength: "焦段",
    },
  },
  en: {
    eyebrow: "Photos",
    title: "Photography",
    intro:
      "A quiet gallery for color-graded finished photographs. The page keeps the interface restrained so color, light, and composition stay in front.",
    galleryTitle: "Selected Frames",
    galleryDescription:
      "Each frame keeps shutter, aperture, ISO, and focal length metadata for a fuller portfolio presentation.",
    copyrightTitle: "Copyright",
    copyrightText:
      "For the web, use low to medium resolution exports and keep attribution in the work data. Visible watermarks are best for previews; subtle signatures fit a portfolio better. Disabling drag is only a soft reminder, not real protection.",
    watermarkTitle: "Watermark",
    watermarkText:
      "This layout uses a small corner signature that stays away from the subject. For social previews, export a separate version with a stronger watermark.",
    missingImage: "Photo export pending",
    exposureLabels: {
      shutter: "Shutter",
      aperture: "Aperture",
      iso: "ISO",
      focalLength: "Focal",
    },
  },
  hk: {
    eyebrow: "Photos",
    title: "攝影作品",
    intro:
      "這裡會展示我已經在外部完成調色的成片。頁面盡量克制，讓色彩、光線和構圖成為第一層資訊。",
    galleryTitle: "Selected Frames",
    galleryDescription:
      "每張照片保留快門、光圈、ISO 和焦段資訊，方便回看拍攝條件，也讓作品展示更完整。",
    copyrightTitle: "版權保護",
    copyrightText:
      "建議網頁端使用低至中等解析度展示，並在作品資料中保留署名。明顯水印適合發布預覽圖；正式作品頁更推薦低調署名。禁用直接拖拽只能作為輕量提醒。",
    watermarkTitle: "水印策略",
    watermarkText:
      "目前採用角落署名式水印，不遮擋畫面主體。真正用於社媒傳播時，可以另外匯出帶明顯水印的版本。",
    missingImage: "等待放入成片",
    exposureLabels: {
      shutter: "快門",
      aperture: "光圈",
      iso: "ISO",
      focalLength: "焦段",
    },
  },
  jp: {
    eyebrow: "Photos",
    title: "写真作品",
    intro:
      "外部でカラーグレーディングを終えた写真を静かに見せるためのページです。色、光、構図が主役になるようにしています。",
    galleryTitle: "Selected Frames",
    galleryDescription:
      "各写真にシャッター、絞り、ISO、焦点距離を残し、作品としての情報量も保ちます。",
    copyrightTitle: "著作権保護",
    copyrightText:
      "Web では低から中解像度の書き出しと署名情報の保持がおすすめです。目立つ透かしはプレビュー向きで、作品ページでは控えめな署名の方が自然です。",
    watermarkTitle: "透かし",
    watermarkText:
      "このレイアウトでは被写体を邪魔しない小さな署名を角に置いています。SNS 用には、より強い透かし入りの別書き出しを使えます。",
    missingImage: "写真の追加待ち",
    exposureLabels: {
      shutter: "Shutter",
      aperture: "Aperture",
      iso: "ISO",
      focalLength: "Focal",
    },
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
