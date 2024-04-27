import Link from "next/link";

export const LogoHome = () => {
  return (
    <Link href="/" className="w-full">
      <div className="text-slate-800 flex items-center justify-center font-medium rounded-xl bg-blue-200 h-28 w-full">
        <span className="text-xl">Course platform</span>
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
