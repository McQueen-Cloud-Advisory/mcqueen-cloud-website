import Link from "next/link";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Insights", href: "/insights" },
  { name: "About", href: "/about" },
];

export function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white"
        >
          McQueen Cloud Advisory
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-300 transition hover:text-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <li>
              <Link
                href="/contact"
                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400"
              >
                Discuss a project
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}