"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Settings2 } from "lucide-react";
import { useCallback, useState } from "react";

import { NavbarProps } from "@/types";
import Logo from "../ui/logo";
import NavButton from "../ui/navbar/nav-button";
import RouteDisplay from "../ui/navbar/route-display";
import DarkmodeSwitch from "../ui/navbar/darkmode-switch";
import LangSwitch from "../ui/navbar/lang-switch";
import SideBar from "@/components/layout/sidebar";

type NavLink = {
  name: string;
  href: string;
};

function SearchField({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <NavButton
        aria-label="Open search"
        onClick={() => {
          console.log("Search Clicked");
        }}
        Icon={<Search />}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        console.log("Search Clicked");
      }}
      className="hidden h-9 min-w-56 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-muted transition-colors duration-300 hover:border-accent hover:text-foreground lg:flex"
    >
      <Search size={16} strokeWidth={1.8} />
      <span>Type</span>
      <kbd className="rounded border border-border bg-surface-muted px-1.5 py-0.5 text-xs text-muted">
        /
      </kbd>
      <span>to search</span>
    </button>
  );
}

function NavLinks({
  links,
  lang,
  pathname,
  className = "",
}: {
  links: NavLink[];
  lang: string;
  pathname: string;
  className?: string;
}) {
  return (
    <ul className={`flex items-center ${className}`}>
      {links.map((link) => {
        const hrefWithLang = `/${lang}${link.href === "/" ? "" : link.href}`;
        const isActive =
          link.href === "/"
            ? pathname === `/${lang}`
            : pathname.startsWith(hrefWithLang);

        return (
          <li key={link.href}>
            <Link
              href={hrefWithLang}
              className={`relative block whitespace-nowrap text-sm font-medium transition-colors duration-300 hover:text-foreground ${
                isActive ? "text-foreground" : "text-muted"
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-2 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function Navbar({ lang, dics }: NavbarProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  const links: NavLink[] = [
    { name: dics.index, href: "/" },
    { name: dics.writings, href: "/writings" },
    { name: dics.projects, href: "/projects" },
    { name: dics.photos, href: "/photos" },
    { name: dics.flights, href: "/flights" },
    { name: dics.profile, href: "/profile" },
    { name: dics.contact, href: "/contact" },
  ];

  const tabletLinks = links.filter((link) =>
    ["/", "/writings", "/projects", "/photos"].includes(link.href)
  );

  return (
    <header>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-glass-border bg-glass/80 shadow-glass-inner backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex items-center md:hidden">
                <NavButton
                  aria-label="Open navigation"
                  onClick={() => setSidebarOpen(true)}
                  Icon={<Menu />}
                />
              </div>
              <Logo lang={lang} />
              <div className="min-w-0 md:hidden">
                <RouteDisplay lang={lang} dics={dics} />
              </div>
            </div>

            <div className="hidden min-w-0 flex-1 items-center gap-6 md:flex lg:hidden">
              <NavLinks
                links={tabletLinks}
                lang={lang}
                pathname={pathname}
                className="gap-5"
              />
            </div>

            <div className="hidden min-w-0 flex-1 items-center gap-8 lg:flex">
              <NavLinks
                links={links}
                lang={lang}
                pathname={pathname}
                className="gap-6"
              />
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <div className="hidden lg:block">
                <SearchField />
              </div>

              <div className="hidden md:flex lg:hidden">
                <SearchField compact />
              </div>

              <div className="hidden items-center gap-2 lg:flex">
                <LangSwitch />
                <DarkmodeSwitch />
              </div>

              <div className="relative hidden md:block lg:hidden">
                <NavButton
                  aria-label="Open settings"
                  onClick={() => setSettingsOpen((value) => !value)}
                  Icon={<Settings2 />}
                />
                <div
                  className={`absolute right-0 top-11 z-20 flex items-center gap-2 rounded-lg border border-border bg-surface p-2 shadow-sm transition-all duration-300 ${
                    isSettingsOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <LangSwitch />
                  <DarkmodeSwitch />
                </div>
              </div>

              <div className="flex items-center gap-2 md:hidden">
                <SearchField compact />
                <DarkmodeSwitch />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <SideBar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        lang={lang}
        dics={dics}
        links={links}
      />
    </header>
  );
}
