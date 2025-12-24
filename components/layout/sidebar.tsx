// components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Import Some Self-defined Types
import { SidebarProps } from "@/types";

// Import some components ui
import Logo from "../ui/logo";
import { X } from "lucide-react";

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    isOpen ? onClose() : null;
  }, [pathname]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        

        <nav className="flex flex-col p-4 space-y-4">
          
        </nav>
      </aside>
    </>
  );
}
