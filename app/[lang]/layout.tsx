import "@/app/globals.css";
import { timesSans, kaitiSans } from "@/libs/fonts";
import NavBar from "@/components/navbar";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  console.log(lang)
  const fontClass = lang === "zh" ? "font-kaiti" : "font-times";

  return (
    <div
      className={`${timesSans.variable} ${kaitiSans.variable} ${fontClass} antialiased`}
    >
      <NavBar />
      {children}
    </div>
  );
}
