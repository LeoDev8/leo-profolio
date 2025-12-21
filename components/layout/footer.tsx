"use client";

import { FooterProps } from "@/types";
import React from "react";

export default function Footer({
  lang,
  dics,
}: FooterProps) {
  return (
    <footer className="w-full bg-background text-foreground text-center py-6">
      Copyright© 2025 Leo Profolio
    </footer>
  );
}
