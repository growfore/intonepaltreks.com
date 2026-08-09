import Link from "next/link";

export interface TCategoryCardProps {
  image?: string;
  text?: string;
  link?: string;
}
export default function CategoryCard({
  image,
  text,
  link,
}: TCategoryCardProps) {
  return (
    <Link
      href={link ?? "/"}
      style={{
        background: `url(${image ?? "/images/everest.jpg"})`,
        backgroundSize: "cover",
      }}
      className="block size-32 md:size-56 rounded-md hover:scale-104 delay-75 duration-300 transition-all"
    >
      <div className="flex items-center justify-center size-32 md:size-56 font-black text-white text-shadow-2xs  text-base md:text-xl text-center">
        {text ?? "Trekking in Nepal"}
      </div>
    </Link>
  );
}
