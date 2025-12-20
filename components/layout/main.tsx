"use client";

import * as React from "react";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-210 bg-background text-foreground ">{children}</main>
  );
}
