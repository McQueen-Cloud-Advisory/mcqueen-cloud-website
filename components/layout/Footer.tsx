import Link from "next/link";
import { EngineeringKnowledgeBaseLink } from "@/components/engagement/EngineeringKnowledgeBaseLink";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="site-shell">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand" aria-label="McQueen Cloud Advisory home">
              <Image src="/brand/v2/mca-lockup-horizontal-light.svg" width={1400} height={360} alt="" className="brand-lockup" />
              <Image src="/brand/v2/mca-symbol-light.svg" width={400} height={400} alt="" className="brand-symbol" />
            </Link>
            <p className="mt-4 max-w-md leading-relaxed text-muted">Thoughtful architecture. Dependable systems.</p>
          </div>
          <nav aria-label="Footer navigation" className="footer-links">
            <Link href="/work" className="text-link">Work</Link>
            <Link href="/assessment" className="text-link">Assessment</Link>
            <Link href="/about" className="text-link">About</Link>
            <Link href="/contact" className="text-link">Contact</Link>
            <EngineeringKnowledgeBaseLink variant="text" label="Cloud engineering knowledge base" />
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} McQueen Cloud Advisory</p>
          <p>Analytics, automation, and systems design</p>
        </div>
      </div>
    </footer>
  );
}
