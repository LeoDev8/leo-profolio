"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

import Navbutton from "./nav-button";

type ViewTransition = {
  finished: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition;
};

export default function DarkmodeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Navbutton
      aria-label="Toggle color theme"
      Icon={
        <>
          <Sun className="dark:hidden" />
          <Moon className="hidden dark:block" />
        </>
      }
      onClick={(event) => {
        const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
        const transitionDocument = document as ViewTransitionDocument;
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        if (!transitionDocument.startViewTransition || prefersReducedMotion) {
          setTheme(nextTheme);
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;
        const radius = Math.hypot(
          Math.max(originX, window.innerWidth - originX),
          Math.max(originY, window.innerHeight - originY)
        );

        document.documentElement.style.setProperty(
          "--theme-wave-x",
          `${originX}px`
        );
        document.documentElement.style.setProperty(
          "--theme-wave-y",
          `${originY}px`
        );
        document.documentElement.style.setProperty(
          "--theme-wave-radius",
          `${radius}px`
        );

        const transition = transitionDocument.startViewTransition(() => {
          flushSync(() => {
            setTheme(nextTheme);
          });
        });

        transition.finished.finally(() => {
          document.documentElement.style.removeProperty("--theme-wave-x");
          document.documentElement.style.removeProperty("--theme-wave-y");
          document.documentElement.style.removeProperty("--theme-wave-radius");
        });
      }}
    />
  );
}
