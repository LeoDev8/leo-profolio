"use client";
import { usePathname } from "next/navigation";

export default function RouteDisplay() {
  const pathname = usePathname();
  
  return <span>Route Display</span>;
}
