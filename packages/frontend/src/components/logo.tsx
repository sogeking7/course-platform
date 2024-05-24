import Image from "next/image";
import Link from "next/link";

export const LogoHome = () => {
  return (
    <Link href="/" className="w-full">
      {/* <Image alt="Logo" src="/shoqan.png" width={100} height={30} /> */}
      <div className="text-[#1f2d5a] flex items-center justify-center font-bold h-12 w-max">
        <span className="text-xl">Shoqan Edu</span>
      </div>
    </Link>
  );
};

export const Logo = () => {
  return (
    <Link href="/" className="">
      {/* <Image alt="Logo" src="/shoqan.png" width={100} height={30} /> */}
      <div className="text-[#1f2d5a] flex items-center justify-center font-bold h-7 w-max">
        <span className="text-xl">Shoqan Edu</span>
      </div>
    </Link>
  );
};
