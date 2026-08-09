import { LucideCheck, LucideX } from "lucide-react";
import { decodeHtmlEntities } from "@/lib/html-decoder";

export function IncludeExcludeCard({
  variant,
  html,
  id,
}: {
  variant: "include" | "exclude";
  html: string;
  id: string;
}) {
  const included = variant === "include";
  const Icon = included ? LucideCheck : LucideX;

  return (
    <div
      className={` bg-canvas overflow-hidden ${
        included ? "border-success/60" : "border-[#f3a7b4]"
      }`}
    >
      <div
        className={`flex items-center gap-2 px-5  ${
          included ? "bg-success/10" : "bg-[#fdf1f3]"
        }`}
      >
        <Icon
          className={`size-4 mt-4 ${included ? "text-success" : "text-[#e0526a]"}`}
        />
        <h3 className="font-display font-bold text-lg text-ink">
          {included ? "What's included" : "What's excluded"}
        </h3>
      </div>
      <div
        id={id}
        className={`include-exclude-list ${
          included
            ? "include-exclude-list--include"
            : "include-exclude-list--exclude"
        } p-5 md:p-6 prose max-w-none prose-p:leading-relaxed prose-p:text-ink prose-strong:text-ink prose-strong:font-bold prose-headings:text-ink prose-headings:font-bold [&_ol_li]:before:content-none [&_ol_li]:pl-0`}
        dangerouslySetInnerHTML={{
          __html: decodeHtmlEntities(html),
        }}
      />
    </div>
  );
}
