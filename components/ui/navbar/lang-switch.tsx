// components/lang-switcher.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LOCALES, LocaleKey } from "@/config/locales";
import { Globe } from "lucide-react";
import { getCurrentLang, changeLangPathname } from "@/libs/utils";
import Navbutton from "./nav-button";

export default function LangSwitch() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const curLang = getCurrentLang(pathname);
  console.log(curLang);

  const handleSwitch = (newLang: LocaleKey) => {
    const newPath = changeLangPathname(pathname, newLang);
    router.push(newPath.toString());
  };

  return (
    <div className="relative">
      <div className="">
        {/* {(Object.keys(LOCALES) as LocaleKey[]).map((langKey) => {
        const isActive = pathname?.startsWith(`/${langKey}`);

        return (
          // <button
          //   key={langKey}
          //   onClick={() => handleSwitch(langKey)}
          //   disabled={isActive}
          //   className={`
          //     px-3 py-1 rounded border transition-colors
          //     ${
          //       isActive
          //         ? "bg-black text-white border-black cursor-default"
          //         : "bg-white text-black border-gray-300 hover:bg-gray-100"
          //     }
          //   `}
          // >
          //   {LOCALES[langKey]}
          // </button>
          <span>en</span>
        );
      })} */}
        <Navbutton
          Icon={<Globe />}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </div>
      <div
        className={`absolute z-20 w-20 top-10 border border-border rounded-lg transition-all duration-300 ${
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
              className={`w-full my-2 ${
                isActive
                  ? "bg-foreground text-background border-foreground cursor-default"
                  : "bg-background text-foreground border-gray-300 hover:bg-gray-100"
              }`}
            >
              {LOCALES[langKey]}
            </button>
          );
        })}
      </div>

      {isOpen ? (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed z-5 w-full top-0 left-0 h-screen"
        ></div>
      ) : null}
    </div>
  );
}
