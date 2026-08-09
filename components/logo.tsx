import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex flex-col leading-tight shrink-0 group">
      <Image src={"/logo.png"} width={100} height={100} alt="Into Nepal Treks Logo"/>
    </Link>
  );
}
