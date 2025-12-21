"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

export default function RouteDisplay({ lang }: { lang: String }) {
  // const {pathname, setPathname} = useState("")
  const splitedPathname = usePathname().split("/");
  console.log(`From route-display.tsx: ${splitedPathname.length}`);
  if (splitedPathname.length <= 2) {

  }

  return <span>Route Display</span>;
}
