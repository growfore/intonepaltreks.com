import { cn } from "@/lib/utils";

export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = "center",
  tone = "light",
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: React.ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-2xl",
        "mb-12 md:mb-16",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-[11px] font-medium uppercase tracking-[0.24em]",
            dark ? "text-link-bg-soft" : "text-link",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-display text-4xl md:text-6xl text-balance",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-base md:text-lg leading-relaxed",
            dark ? "text-white/70" : "text-mute",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
