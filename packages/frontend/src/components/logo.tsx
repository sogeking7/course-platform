import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="w-[140px]">
      <Image alt="Logo" src="/shoqan-edu.svg" width={140} height={30} />
    </Link>
  );
};
