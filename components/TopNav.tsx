"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useMemo, useState, useCallback } from "react";
import { MENU, type MenuGroup } from "@/lib/menu";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

/** Normalize path for reliable comparisons */
function normPath(p?: string | null): string {
  if (!p) return "/";
  if (p !== "/" && p.endsWith("/")) return p.slice(0, -1);
  return p;
}

/** Derive active top-level menu by matching pathname with any item's href */
function determineActiveMenuFromMenu(pathname: string): string | null {
  const p = normPath(pathname);
  for (const m of MENU) {
    if (!m.items?.length) continue;
    if (m.items.some((it) => it.href && p.startsWith(normPath(it.href)))) {
      return m.key;
    }
  }
  // fallback for explicit home
  return p === "/" ? "home" : null;
}

export default function TopNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const currentActiveMenu = useMemo(
    () => determineActiveMenuFromMenu(pathname),
    [pathname]
  );

  const activeMenuData = useMemo(
    () => MENU.find((m) => m.key === currentActiveMenu) ?? null,
    [currentActiveMenu]
  );

  const toLinkFirst = useCallback((menuKey: string, menuHref?: string) => {
    if (!menuHref) return;
    setHoveredMenu(null);
    router.push(menuHref); // SPA navigation
  }, [router]);

  return (
    <nav className="sticky top-0 z-50 border-b border-pitch-border bg-pitch-black">
      {/* Top Bar - Main Menu */}
      <div className="flex items-center gap-1 px-4 py-3">
        {MENU.map((menu: MenuGroup) => {
          const firstHref = menu.items?.[0]?.href;
          const isActive = currentActiveMenu === menu.key;

          return (
            <div
              key={menu.key}
              className="relative"
              onMouseEnter={() => setHoveredMenu(menu.key)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <button
                type="button"
                aria-haspopup={menu.items?.length ? "menu" : undefined}
                aria-expanded={hoveredMenu === menu.key}
                onClick={() => toLinkFirst(menu.key, firstHref)}
                disabled={!firstHref}
                className={`flex items-center gap-1 rounded px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-pitch-surface text-white"
                    : "text-neutral-400 hover:bg-pitch-surface hover:text-white"
                } ${!firstHref ? "cursor-not-allowed opacity-50" : ""}`}
              >
                {menu.label}
                <ChevronDownIcon className="h-4 w-4" />
              </button>

              {/* Hover Dropdown */}
              {hoveredMenu === menu.key && menu.items?.length ? (
                <div
                  role="menu"
                  className="absolute left-0 top-full mt-1 min-w-[200px] rounded border border-pitch-border bg-pitch-black py-1 shadow-xl"
                >
                  {menu.items.map((item) => {
                    const isItemActive =
                      normPath(pathname) === normPath(item.href ?? "");
                    return (
                      <Link
                        key={item.key}
                        href={item.href || "/"}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          isItemActive
                            ? "bg-pitch-surface text-white"
                            : "text-neutral-300 hover:bg-pitch-surface hover:text-white"
                        }`}
                        role="menuitem"
                        onClick={() => setHoveredMenu(null)}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Second Bar - Submenu (for the active top-level menu) */}
      {activeMenuData?.items?.length ? (
        <div className="flex gap-2 overflow-x-auto border-t border-pitch-border bg-pitch-black px-4 py-2">
          {activeMenuData.items.map((item) => {
            const isItemActive =
              normPath(pathname) === normPath(item.href ?? "");
            return (
              <Link
                key={item.key}
                href={item.href || "/"}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  isItemActive
                    ? "bg-pitch-surface text-white"
                    : "text-neutral-400 hover:bg-pitch-surface hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </nav>
  );
}
