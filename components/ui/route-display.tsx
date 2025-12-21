"use client";

import { usePathname } from "next/navigation";

export default function RouteDisplay({ lang }: { lang: String }) {
  const pathname = usePathname();

  return <span>Route Display</span>;
}
