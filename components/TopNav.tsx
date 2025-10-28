"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MENU, type MenuGroup } from "@/lib/menu";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function TopNav() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string>("home");
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  // Determine active menu based on pathname
  const determineActiveMenu = () => {
    if (pathname === "/") return "home";
    const segment = pathname.split("/")[1];
    if (segment === "sim") return "simulation";
    if (segment === "route") return "route";
    if (segment === "forecast") return "forecast";
    if (segment === "utils") return "utilities";
    return "home";
  };

  const currentActiveMenu = determineActiveMenu();
  const activeMenuData = MENU.find((m) => m.key === currentActiveMenu);

  return (
    <nav className="sticky top-0 z-50 border-b border-pitch-border bg-pitch-black">
      {/* Top Bar - Main Menu */}
      <div className="flex items-center gap-1 px-4 py-3">
        {MENU.map((menu) => (
          <div
            key={menu.key}
            className="relative"
            onMouseEnter={() => setHoveredMenu(menu.key)}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <Link
              href={menu.items[0].href || "/"}
              onClick={() => setActiveMenu(menu.key)}
              className={`flex items-center gap-1 rounded px-4 py-2 text-sm font-medium transition-colors ${
                currentActiveMenu === menu.key
                  ? "bg-pitch-surface text-white"
                  : "text-neutral-400 hover:bg-pitch-surface hover:text-white"
              }`}
            >
              {menu.label}
              <ChevronDownIcon className="h-4 w-4" />
            </Link>

            {/* Hover Dropdown */}
            {hoveredMenu === menu.key && menu.items && (
              <div className="absolute left-0 top-full mt-1 min-w-[200px] rounded border border-pitch-border bg-pitch-black py-1 shadow-xl">
                {menu.items.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href || "/"}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      pathname === item.href
                        ? "bg-pitch-surface text-white"
                        : "text-neutral-300 hover:bg-pitch-surface hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Second Bar - Submenu */}
      {activeMenuData?.items && (
        <div className="horizontal-scroll flex gap-2 overflow-x-auto border-t border-pitch-border bg-pitch-black px-4 py-2">
          {activeMenuData.items.map((item) => (
            <Link
              key={item.key}
              href={item.href || "/"}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                pathname === item.href
                  ? "bg-pitch-surface text-white"
                  : "text-neutral-400 hover:bg-pitch-surface hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}