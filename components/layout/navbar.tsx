"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Moon, Sun, Menu, X, User } from "lucide-react";
import { useTheme } from "next-themes";

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
  const { theme, setTheme } = useTheme();
  console.log(theme);

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-50 w-ful bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-12 h-20 flex items-center justify-between">
          {/* 1. Logo: Only some texts*/}
          <div className="shrink-0">
            <Link
              href={`/${lang}`}
              className="text-2xl font-bold tracking-tight hover:opacity-70 transition-opacity"
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
                  className={`relative block text-lg transition-all duration-300 ease-in-out  hover:text-foreground/800 ${
                    isActive ? "text-foreground font-medium" : "text-foreground/60"
                  }`}
                >
                  <span className="capitalize">{link.name}</span>

                  <span
                    className={`absolute -bottom-1 left-0 w-full h-px bg-foreground transition-transform duration-300 origin-left ${
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
            <button>
              <Search></Search>
            </button>

            <button>
              <Sun></Sun>
            </button>
            <button>
              <Menu></Menu>
            </button>
            <button>
              <X></X>
            </button>

            <button>
              <User></User>
            </button>

            <Link
              href={`/en`}
              className={
                lang === "en"
                  ? "text-foreground font-bold font-times"
                  : "hover:text-foreground font-times"
              }
            >
              English
            </Link>
            <span>/</span>
            <Link
              href={`/zh`}
              className={
                lang === "zh"
                  ? "text-foreground font-bold font-kaiti"
                  : "hover:text-foreground font-kaiti"
              }
            >
              简体中文
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
