import localFont from "next/font/local";

export const timesSans = localFont({
  src: "../public/fonts/times.ttf",
  variable: "--font-times",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const kaitiSans = localFont({
  src: "../public/fonts/Kaiti_GB2312.ttf",
  variable: "--font-kaiti",
  weight: "100 200 300 400 500 600 700 800 900",
});
