"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

import { SidebarProps } from "@/types";
import Logo from "../ui/logo";
import NavButton from "../ui/navbar/nav-button";
import LangSwitch from "../ui/navbar/lang-switch";

export default function Sidebar({
  isOpen,
  onClose,
  lang,
  dics,
  links,
}: SidebarProps) {
  const pathname = usePathname();
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      previousPathnameRef.current = pathname;
      if (isOpen) onClose();
    }
  }, [isOpen, onClose, pathname]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-72 max-w-[82vw] flex-col border-r border-border bg-background shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-2">
            <Logo lang={lang} />
            <span className="text-sm font-semibold text-foreground">
              {dics.index}
            </span>
          </div>
          <NavButton aria-label="Close navigation" onClick={onClose} Icon={<X />} />
        </div>

        <nav className="flex flex-1 flex-col gap-2 px-4 py-5">
          {links.map((link) => {
            const hrefWithLang = `/${lang}${link.href === "/" ? "" : link.href}`;
            const isActive =
              link.href === "/"
                ? pathname === `/${lang}`
                : pathname.startsWith(hrefWithLang);

            return (
              <Link
                key={link.href}
                href={hrefWithLang}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "bg-surface-muted text-foreground"
                    : "text-muted hover:bg-surface hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <p className="mb-3 text-xs font-medium uppercase text-muted">
            Language
          </p>
          <LangSwitch />
        </div>
      </aside>
    </>
  );
}
