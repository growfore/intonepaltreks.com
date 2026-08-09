"use client";

import { useState } from "react";
import { decodeHtmlEntities } from "@/lib/html-decoder";

export function TripHeaderDescription({ html }: { html: string }) {
  const [expanded, setExpanded] = useState(false);
  const text = decodeHtmlEntities(html);

  return (
    <div className="mt-5">
      <div
        className={`content-body prose max-w-none prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg prose-p:text-ink prose-a:text-link prose-a:underline prose-ul:list-none prose-li:pl-0 prose-li:before:content-none ${
          expanded ? "" : "line-clamp-4"
        }`}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-3 text-sm font-semibold text-link hover:text-link-deep underline underline-offset-4"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
