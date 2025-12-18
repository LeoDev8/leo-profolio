"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Moon, Sun } from "lucide-react";

interface NavbarProps {
  lang: string;
  dics: {
    index: String;
    profile: String;
    works: String;
    writings: String;
    contact: String;
  };
}

export default function Navbar({ lang, dics }: NavbarProps) {
  const pathname = usePathname();
  const links = [
    { name: dics.index, href: "/" },
    { name: dics.profile, href: "/profile" },
    { name: dics.works, href: "/works" },
    { name: dics.writings, href: "/writing" },
    { name: dics.contact, href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-12 h-20 flex items-center justify-between">
        {/* 1. Logo: Only some texts*/}
        <div className="shrink-0">
          <Link
            href={`/${lang}`}
            className="font-serif text-2xl font-bold tracking-tight hover:opacity-70 transition-opacity"
          >
            Leo <span>.</span>
          </Link>
        </div>

        {/* 2. Navigation: hidden in the mobile */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((link) => {
            const hrefWithLang = `/${lang}${
              link.href === "/" ? "" : link.href
            }`;

            const isActive =
              link.href === "/"
                ? pathname === `/${lang}`
                : pathname.startsWith(hrefWithLang);

            return (
              <Link
                key={link.href}
                href={hrefWithLang}
                className={`relative block text-lg transition-all duration-300 ease-in-out  hover:text-gray-900 ${
                  isActive ? "text-black font-medium" : "text-gray-500"
                }`}
              >
                <span className="capitalize">{link.name}</span>

                <span
                  className={`absolute -bottom-1 left-0 w-full h-px bg-black transition-transform duration-300 origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }
                `}
                />
              </Link>
            );
          })}
        </ul>

        {/* 3. Right: Dark Mode */}
        <div className="hidden md:flex items-center gap-4 text-sm text-gray-400">
          <Search></Search>
          <Moon></Moon>
          <Sun></Sun>
          <Link
            href={`/en`}
            className={
              lang === "en"
                ? "text-black font-bold font-times"
                : "hover:text-black font-times"
            }
          >
            English
          </Link>
          <span>/</span>
          <Link
            href={`/zh`}
            className={
              lang === "zh"
                ? "text-black font-bold font-kaiti"
                : "hover:text-black font-kaiti"
            }
          >
            简体中文
          </Link>
        </div>
      </div>
    </nav>
  );
}
