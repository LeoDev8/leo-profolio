import "@/app/globals.css";
import { timesSans, kaitiSans } from "@/libs/fonts";
import { getDictionary } from "@/libs/dictionaries";
import Navbar from "@/components/layout/navbar";
import Main from "@/components/layout/main";
import Footer from "@/components/layout/footer";
import { LOCALES, LocaleKey } from "@/config/locales";

const isLocaleKey = (lang: string): lang is LocaleKey => lang in LOCALES;

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang: rawLang } = await params;
  const lang = isLocaleKey(rawLang) ? rawLang : "en";
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
