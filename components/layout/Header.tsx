"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { BrandMark } from "@/components/visuals/BrandMark";

const navigation = [
  { name: "Work", href: "/work" },
  { name: "Assessment", href: "/assessment" },
  { name: "Insights", href: "/insights" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const links = [...navigation, { name: "Contact", href: "/contact" }];

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }}>
      <div className="site-shell header-inner">
        <Link href="/" className="brand" aria-label="McQueen Cloud Advisory home" onClick={() => setMenuOpen(false)}>
          <BrandMark />
          <span className="brand-wordmark"><strong>McQueen</strong><span>Cloud Advisory</span></span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden lg:block">
          <ul className="desktop-nav">
            {links.map((item) => <li key={item.href}>
              <Link href={item.href} className={`nav-link ${item.href === "/contact" ? "nav-contact" : ""}`} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.name}{item.href === "/contact" && <span aria-hidden="true" className="ml-4">↗</span>}
              </Link>
            </li>)}
          </ul>
        </nav>
        <button ref={menuButton} type="button" className="mobile-menu-button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d={menuOpen ? "m6 6 12 12M6 18 18 6" : "M4 8h16M4 16h16"} />
          </svg>
        </button>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav" hidden={!menuOpen}>
        <ul className="site-shell">
          {links.map((item) => <li key={item.href}>
            <Link href={item.href} className={`nav-link ${item.href === "/contact" ? "nav-contact" : ""}`} aria-current={isActive(item.href) ? "page" : undefined} onClick={() => setMenuOpen(false)}>{item.name}</Link>
          </li>)}
        </ul>
      </nav>
    </header>
  );
}
