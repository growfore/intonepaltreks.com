import { cn } from "@/lib/utils";

export default function Section({
  id,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div
        className={cn(
          "container mx-auto px-4 md:px-8 max-w-[1400px]",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
