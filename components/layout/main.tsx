"use client";

import * as React from "react";
// import { useState, useEffect } from "react";
// import { cn } from "@/libs/utils";
// import { useTheme } from "next-themes";

export default function Main({ children }: { children: React.ReactNode }) {
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!mounted) {
  //   return null;
  // }

  // // return (
  // //   <main
  // //     className={cn("min-h-210", {
  // //       "dark-mo": theme === "dark",
  // //       "bg-white text-black": theme === "light",
  // //     })}
  // //   >
  // //     {children}
  // //   </main>
  // // );

  return (
    <main className="min-h-210 bg-background text-foreground ">{children}</main>
  );
}
