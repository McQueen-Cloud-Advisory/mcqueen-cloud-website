import Link from "next/link";
import { EngineeringKnowledgeBaseLink } from "@/components/engagement/EngineeringKnowledgeBaseLink";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 lg:px-8">
        <div>
          <p className="text-lg font-semibold text-white">
            McQueen Cloud Advisory
          </p>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Practical analytics, workflow automation, and Google Cloud
            solutions designed around real operational needs.
          </p>
        </div>

        <div className="md:text-right">
          <p className="text-sm text-slate-400">
            Turning data into action. Turning action into impact.
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 md:justify-end">
            <Link
              href="/about"
              className="text-sm text-slate-400 hover:text-white"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-sm text-slate-400 hover:text-white"
            >
              Contact
            </Link>

            <EngineeringKnowledgeBaseLink
              variant="text"
              label="Cloud engineering knowledge base"
              className="text-sm"
            />
          </div>

          <p className="mt-6 text-xs text-slate-500">
            © {new Date().getFullYear()} McQueen Cloud Advisory. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}