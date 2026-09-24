import Link from "next/link";

export default function NotFound() {
  return (
    <section className="site-shell flex min-h-[70vh] items-center py-24">
      <div className="w-full border-t border-line pt-10">
        <p className="eyebrow">404 / Address not found</p>
        <h1 className="display-title mt-6 max-w-4xl">A missing connection.</h1>
        <p className="lede mt-8 max-w-xl">This page may have moved, or the address may be incorrect. There is still plenty to explore.</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/" className="button button-primary">Return home <span aria-hidden="true">↗</span></Link>
          <Link href="/work" className="button button-secondary">View selected work</Link>
        </div>
      </div>
    </section>
  );
}
