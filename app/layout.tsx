import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leo Profolio",
  description: "Leo Profolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
