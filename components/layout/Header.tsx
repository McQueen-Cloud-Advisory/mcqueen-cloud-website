"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Insights", href: "/insights" },
  { name: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link
          href="/"
          onClick={closeMenu}
          className="font-semibold tracking-tight text-white"
          aria-label="McQueen Cloud Advisory home"
        >
          <span className="sm:hidden">McQueen Cloud</span>
          <span className="hidden sm:inline">McQueen Cloud Advisory</span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden lg:block"
        >
          <ul className="flex items-center gap-6">
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`text-sm font-medium transition ${
                      active
                        ? "text-blue-400"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}

            <li>
              <Link
                href="/contact"
                aria-current={isActive("/contact") ? "page" : undefined}
                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400"
              >
                Discuss a project
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex items-center justify-center rounded-md border border-slate-700 p-2 text-slate-300 transition hover:border-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {menuOpen ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-slate-800 bg-slate-950 px-6 pb-6 pt-4 lg:hidden"
        >
          <ul className="mx-auto max-w-7xl space-y-2">
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-md px-4 py-3 font-medium transition ${
                      active
                        ? "bg-blue-400/10 text-blue-300"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}

            <li className="pt-3">
              <Link
                href="/contact"
                onClick={closeMenu}
                aria-current={isActive("/contact") ? "page" : undefined}
                className="block rounded-md bg-blue-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-400"
              >
                Discuss a project
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}