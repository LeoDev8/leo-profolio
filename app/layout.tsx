import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const timesSans = localFont({
  src: "./fonts/times.ttf",
  variable: "--font-times",
  weight: "100 200 300 400 500 600 700 800 900",
});
const kaitiSans = localFont({
  src: "./fonts/Kaiti_GB2312.ttf",
  variable: "--font-kaiti",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "Leo Profolio",
  description: "Leo Profolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${timesSans.variable} ${kaitiSans.variable} font-times antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
