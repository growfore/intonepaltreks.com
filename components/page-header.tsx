export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}) {
  return (
    <section className="bg-primary pt-16 md:pt-28 pb-14 md:pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.24em] text-link-bg-soft">
              {eyebrow}
            </p>
          )}
          <h1 className="text-display text-5xl md:text-7xl text-white text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
