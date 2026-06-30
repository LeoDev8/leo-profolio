"use client";

import * as React from "react";

// Import Some Self-defined Types
import { MainProps } from "@/types";

export default function Main({
  children,
}: React.PropsWithChildren<MainProps>) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background/80 text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)]" />
      <div className="relative z-10">{children}</div>
    </main>
  );
}
