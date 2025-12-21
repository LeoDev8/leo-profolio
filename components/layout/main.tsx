"use client";

import * as React from "react";

// Import Some Self-defined Types
import { MainProps } from "@/types";

export default function Main({
  lang,
  dics,
  children,
}: React.PropsWithChildren<MainProps>) {
  return (
    <main className="min-h-210 bg-background text-foreground ">{children}</main>
  );
}
