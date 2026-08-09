import Image from "next/image";
import { getFullImageUrl } from "@/lib/getFullImageUrl";
export interface TeamCardProps {
  image?: string;
  name: string;
  designation: string;
  description: string;
}

export default function TeamCard({
  image,
  name,
  designation,
  description,
}: TeamCardProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 bg-canvas border border-hairline rounded-2xl p-6">
      <div className="size-32 shrink-0 rounded-2xl overflow-hidden bg-canvas-soft mx-auto sm:mx-0">
        <Image
          src={image ? getFullImageUrl(image) : "/images/everest.jpg"}
          width={128}
          height={128}
          unoptimized
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="space-y-2 text-center sm:text-left">
        <h3 className="font-semibold text-ink">{name}</h3>
        <p className="text-sm text-mute">{designation}</p>
        <p className="text-sm text-body leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
