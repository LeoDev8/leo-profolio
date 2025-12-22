"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";

// Import Some Self-defined Types
import { NavbarProps } from "@/types";

// Import some components ui
import Logo from "../ui/logo";
import Menubutton from "../ui/menu-button";
import RouteDisplay from "../ui/route-display";

export default function Navbar({ lang, dics }: NavbarProps) {
  const pathname = usePathname();
  const links = [
    { name: dics.index, href: "/" },
    { name: dics.profile, href: "/profile" },
    { name: dics.works, href: "/works" },
    { name: dics.writings, href: "/writings" },
    { name: dics.contact, href: "/contact" },
  ];
  const { theme, setTheme } = useTheme();

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-50 w-ful bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* <div>
            <button className="">
              <User className=""></User>
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
          </div> */}
          {/* 1. Mobile Design */}
          <div className="flex justify-between items-center md:hidden lg:hidden">
            {/* Menu Button */}
            <Menubutton />
            {/* Logo */}
            <Logo lang={lang} />
            {/* Route Display */}
            <RouteDisplay lang={lang} dics={dics}/>
            {/* Search Button */}
            {/* Avatar */}
          </div>

          {/* 2. Middle Screen Design*/}
          <div className="hidden lg:hidden md:flex items-center gap-4 text-sm text-gray-400">
            {/* Navigation Tags */}
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
                      isActive
                        ? "text-foreground font-medium"
                        : "text-foreground/60"
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
            {/* Search Button */}
            <div className="hidden md:flex justify-start items-center px-2 flex-start min-w-2xs h-8 border border-border rounded-lg">
              <label htmlFor="">
                <Search></Search>
              </label>
              <button>
                Type <kbd>/</kbd> to search
              </button>
            </div>
          </div>

          {/* 3. Large Screen Design*/}
          <div className="hidden md:hidden lg:flex items-center gap-4 text-sm text-gray-400">
            {/* Logo */}
            <Logo lang={lang}></Logo>

            {/* Navigation Tags */}
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
                      isActive
                        ? "text-foreground font-medium"
                        : "text-foreground/60"
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
            {/* Search Button */}
            <div className="hidden lg:flex justify-start items-center px-2 flex-start min-w-2xs h-8 border border-border rounded-lg">
              <label htmlFor="">
                <Search></Search>
              </label>
              <button>
                Type <kbd>/</kbd> to search
              </button>
            </div>
            <label className="lg:hidden">
              <Search></Search>
            </label>
          </div>
        </div>
      </nav>
    </header>
  );
}
