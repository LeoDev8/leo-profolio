"use client";

import { NavbarProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routeDisplayClassname = "text-xl font-extrabold";

export default function RouteDisplay({ lang, dics }: NavbarProps) {
  const splitedPathname = usePathname().split(`/${lang}`).filter(Boolean);

  if (splitedPathname.length === 0) {
    return (
      <Link className={routeDisplayClassname} href={`/`}>
        {dics["index"]}
      </Link>
    );
  } else {
    const routeKey = splitedPathname[0].split("/")[1] as keyof typeof dics;
    return (
      <Link
        className={`${routeDisplayClassname} capitalize`}
        href={`/${splitedPathname[0].split("/")[1]}`}
      >
        {dics[routeKey]}
      </Link>
    );
  }
}
