import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex flex-col leading-tight shrink-0 group">
      <span className="font-serif text-2xl md:text-[1.7rem] leading-none text-ink tracking-tight">
        Into Nepal
      </span>
      <span className="text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] text-link">
        Treks
      </span>
    </Link>
  );
}
