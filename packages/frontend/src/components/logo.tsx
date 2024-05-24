import Image from "next/image";
import Link from "next/link";
 
export const LogoHome = () => {
  return (
    <Link href="/" className="w-full">
      {/* <Image alt="Logo" src="/shoqan.png" width={100} height={30} /> */}
      <div className="text-slate-800 flex items-center justify-center font-medium h-12 w-max">
        <span className="text-xl">Shoqan Edu</span>
      </div>
    </Link>
  );
};

export const Logo = () => {
  return (
    <Link href="/">
      <span className="text-3xl font-semibold text-blue-600">Coursera</span>
    </Link>
  );
};
