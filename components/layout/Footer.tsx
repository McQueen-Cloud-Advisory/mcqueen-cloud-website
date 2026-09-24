import Link from "next/link";
import { EngineeringKnowledgeBaseLink } from "@/components/engagement/EngineeringKnowledgeBaseLink";
import { BrandMark } from "@/components/visuals/BrandMark";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="site-shell">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand" aria-label="McQueen Cloud Advisory home">
              <BrandMark size={30} />
              <span className="text-lg font-semibold tracking-tight">McQueen Cloud Advisory</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted">Thoughtful architecture. Dependable systems.<br />A clear path from complexity to useful work.</p>
          </div>
          <nav aria-label="Footer navigation" className="footer-links">
            <Link href="/work" className="text-link">Work</Link>
            <Link href="/about" className="text-link">About</Link>
            <Link href="/contact" className="text-link">Contact</Link>
            <EngineeringKnowledgeBaseLink variant="text" label="Cloud engineering knowledge base" />
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} McQueen Cloud Advisory</p>
          <p className="font-mono text-[10px] uppercase tracking-widest">Analytics / Automation / Architecture</p>
        </div>
      </div>
    </footer>
  );
}
