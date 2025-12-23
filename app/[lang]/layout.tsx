import "@/app/globals.css";
import { timesSans, kaitiSans } from "@/libs/fonts";
import { getDictionary } from "@/libs/dictionaries";
import Navbar from "@/components/layout/navbar";
import Main from "@/components/layout/main";
import Footer from "@/components/layout/footer";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: "en" | "zh" }>;
}>) {
  const { lang } = await params;
  const fontClass = lang === "zh" ? "font-lang-zh" : "font-lang-en";
  const dics = await getDictionary(lang);

  return (
    <div
      className={`${timesSans.variable} ${kaitiSans.variable} ${fontClass} min-h-screen flex flex-col`}
    >
      <Navbar lang={lang} dics={dics.nav} />
      <Main lang={lang} dics={dics.main}>
        {children}
      </Main>
      <Footer lang={lang} dics={dics.footer} />
    </div>
  );
}
