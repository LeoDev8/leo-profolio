// components/lang-switcher.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { LOCALES, LocaleKey } from "@/config/locales";
import { Globe } from "lucide-react";
import { changeLangPathname } from "@/libs/utils";
import Navbutton from "./nav-button";

export default function LangSwitch() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!isOpen) return;

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSwitch = (newLang: LocaleKey) => {
    const newPath = changeLangPathname(pathname, newLang);
    router.push(newPath.toString());
  };

  return (
    <div ref={wrapperRef} className="relative">
      <Navbutton
        Icon={<Globe />}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      <div
        className={`absolute z-20 w-24 right-0 top-10 border border-glass-border rounded-lg bg-glass-strong py-1 shadow-glass backdrop-blur-md transition-all duration-motion ${
          !isOpen ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
      >
        {(Object.keys(LOCALES) as LocaleKey[]).map((langKey) => {
          const isActive = pathname.startsWith(`/${langKey}`);

          return (
            <button
              key={langKey}
              onClick={() => {
                handleSwitch(langKey);
              }}
              className={`w-full px-3 py-1.5 text-left text-sm cursor-pointer transition-colors duration-motion ${
                isActive
                  ? "text-foreground border-foreground cursor-default"
                  : "text-foreground/50 border-border hover:text-foreground"
              }`}
            >
              {LOCALES[langKey]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
