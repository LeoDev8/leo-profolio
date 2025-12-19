import "@/app/globals.css";
import { timesSans, kaitiSans } from "@/libs/fonts";
import Navbar from "@/components/layout/navbar";
import Main from "@/components/layout/main";
import Footer from "@/components/layout/footer";
import { getDictionary } from "@/libs/dictionaries";

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
      className={`${timesSans.variable} ${kaitiSans.variable}  ${fontClass} min-h-screen flex flex-col`}
    >
      <Navbar lang={lang} dics={dics.nav} />
      <Main>{children}</Main>
      <Footer></Footer>
    </div>
  );
}
