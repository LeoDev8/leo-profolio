import "@/app/globals.css";
import { timesSans, kaitiSans } from "@/libs/fonts";
import Navbar from "@/components/layout/navbar";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const fontClass = lang === "zh" ? "font-lang-zh" : "font-lang-en";

  return (
    <div
      className={`${timesSans.variable} ${kaitiSans.variable}  ${fontClass} min-h-screen flex flex-col bg-white text-black`}
    >
      <header>
        <Navbar lang={lang} />
      </header>

      <main>{children}</main>

      <footer className="w-full py-6 text-center text-gray-500 text-sm">
        ©Copyright 2025 Leo Profolio
      </footer>
    </div>
  );
}
