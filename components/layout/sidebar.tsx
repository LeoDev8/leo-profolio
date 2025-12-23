// components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // 当路由变化时（用户点击了链接），自动关闭侧边栏
  useEffect(() => {
    isOpen ? onClose() : null;
  }, [pathname]);

  return (
    <>
      {/* 1. 遮罩层 (Backdrop) - 点击空白处关闭 */}
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
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">My App</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-4">
          <Link href="/" className="hover:text-blue-600 transition">
            首页
          </Link>
        </nav>
      </aside>
    </>
  );
}
