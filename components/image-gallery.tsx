import Image from "next/image";
import { Button } from "./ui/button";
import { LucideImage } from "lucide-react";
import Lightbox from "@/components/claude/lightbox";
import { getFullImageUrl } from "@/lib/getFullImageUrl";

export default function ImageGallery({
  images,
  keywords,
}: {
  images: string[];
  keywords: string[];
}) {
  const fullUrls = images.map(getFullImageUrl);
  const imageCount = fullUrls.length;

  if (imageCount === 0) return null;

  const rightImages =
    imageCount <= 3 ? fullUrls.slice(1) : fullUrls.slice(1, 5);

  const rightCount = rightImages.length;

  return (
    <div className="relative px-4 md:px-0">
      <Lightbox images={fullUrls} imageAlts={keywords}>
        <div>
          {imageCount === 1 && (
            <div className="relative container mx-auto grid grid-cols-1 gap-2 rounded-2xl md:max-h-[80vh] overflow-hidden">
              <div className="overflow-hidden rounded-2xl min-h-0">
                <Image
                  data-lightbox-index={0}
                  src={fullUrls[0]}
                  alt={keywords[0] || "Image 1"}
                  height={1280}
                  width={1920}
                  unoptimized
                  loading="eager"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <Button
                className="absolute top-4 left-4 opacity-90 font-semibold text-xs"
                variant={"secondary"}
              >
                <LucideImage /> 1 Photo
              </Button>
            </div>
          )}

          {imageCount === 2 && (
            <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 rounded-2xl md:max-h-[80vh] overflow-hidden">
              {fullUrls.map((url, i) => (
                <div key={url} className="overflow-hidden rounded-2xl min-h-0">
                  <Image
                    data-lightbox-index={i}
                    src={url}
                    alt={keywords[i] || `Image ${i + 1}`}
                    height={1280}
                    width={1920}
                    unoptimized
                    loading={i === 0 ? "eager" : undefined}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
              <Button
                className="absolute top-4 left-4 opacity-90 font-semibold text-xs"
                variant={"secondary"}
              >
                <LucideImage /> 2 Photos
              </Button>
            </div>
          )}

          {imageCount >= 3 && (
            <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 rounded-2xl md:max-h-[80vh] overflow-hidden">
              <div className="md:col-span-2 overflow-hidden rounded-2xl min-h-0">
                <Image
                  data-lightbox-index={0}
                  src={fullUrls[0]}
                  alt={keywords[0] || "Image 1"}
                  height={1280}
                  width={1920}
                  unoptimized
                  loading="eager"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="md:hidden flex flex-row gap-2 overflow-x-auto md:col-span-3">
                {rightImages.map((url, i) => (
                  <div
                    key={url}
                    className="overflow-hidden rounded-2xl shrink-0 w-1/3 max-w-48"
                  >
                    <Image
                      data-lightbox-index={i + 1}
                      src={url}
                      alt={keywords[i + 1] || `Image ${i + 2}`}
                      height={1280}
                      width={1920}
                      unoptimized
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>

              <div className="hidden md:grid md:col-span-1 gap-2 overflow-hidden min-h-0 h-full"
                style={{ gridTemplateRows: "minmax(0, 40vh) minmax(0, 40vh)" }}
              >
                {rightCount === 2 && rightImages.map((url, i) => (
                  <div key={url} className="overflow-hidden rounded-2xl min-h-0 h-full">
                    <Image
                      data-lightbox-index={i + 1}
                      src={url}
                      alt={keywords[i + 1] || `Image ${i + 2}`}
                      height={1280}
                      width={1920}
                      unoptimized
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ))}
                {rightCount >= 3 && (
                  <>
                    <div className="grid grid-cols-2 gap-2 overflow-hidden min-h-0 h-full">
                      {rightImages.slice(0, 2).map((url, i) => (
                        <div key={url} className="overflow-hidden rounded-2xl min-h-0 h-full">
                          <Image
                            data-lightbox-index={i + 1}
                            src={url}
                            alt={keywords[i + 1] || `Image ${i + 2}`}
                            height={1280}
                            width={1920}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                      ))}
                    </div>
                    <div className={`grid gap-2 overflow-hidden min-h-0 h-full ${rightCount === 3 ? "grid-cols-1" : "grid-cols-2"}`}>
                      {rightImages.slice(2).map((url, i) => (
                        <div key={url} className="overflow-hidden rounded-2xl min-h-0 h-full">
                          <Image
                            data-lightbox-index={i + 3}
                            src={url}
                            alt={keywords[i + 3] || `Image ${i + 4}`}
                            height={1280}
                            width={1920}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <Button
                className="absolute top-4 left-4 opacity-90 font-semibold text-xs"
                variant={"secondary"}
              >
                <LucideImage /> {imageCount} Photo{imageCount > 1 ? "s" : ""}
              </Button>
            </div>
          )}
        </div>
      </Lightbox>
    </div>
  );
}
