import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getFullImageUrl } from "@/lib/getFullImageUrl";

export function BlogCard({ blog }: any) {
  const { title, slug, content, coverImage, createdAt, metaDescription } = blog;
  const excerpt = metaDescription || content;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blogs/${slug}`}>
      <Card className="flex flex-col overflow-hidden p-0 hover:shadow-[0px_2px_2px_#0000000a,0px_8px_16px_-4px_#0000000a] transition-shadow">
        {coverImage ? (
          <div className="aspect-video overflow-hidden bg-canvas-soft">
            <Image
              src={getFullImageUrl(coverImage)}
              alt={title}
              width={400}
              height={225}
              unoptimized
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>)
          :
          (<div className="aspect-video overflow-hidden bg-canvas-soft">
          </div>
        )}

        <CardHeader className="p-2">
          <h3 className="text-base font-semibold leading-snug line-clamp-2">
            {title}
          </h3>
        </CardHeader>

        <CardContent className="p-2 flex-1">
          {excerpt && (
            <p
              className="text-sm text-body line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: excerpt.substring(0, 250) + "...",
              }}
            />
          )}
        </CardContent>

        <CardFooter className="p-3 flex items-center justify-between text-xs text-mute">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formattedDate}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
