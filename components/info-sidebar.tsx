import Link from "next/link";

export default async function InfoSidebar() {
  return (
    <aside className="hidden md:block">
      <div className="sticky top-32 space-y-6">
        <div className="border border-hairline rounded-lg p-4 space-y-3">
          <h3 className="text-xs font-medium uppercase tracking-wider text-mute">
            Need Help?
          </h3>
          <Link
            href="/contact"
            className="block text-sm text-body hover:text-ink transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="/about"
            className="block text-sm text-body hover:text-ink transition-colors"
          >
            About Us
          </Link>
        </div>
      </div>
    </aside>
  );
}
