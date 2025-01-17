import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/shoqan-edu.svg";
import logo2 from "@/../public/logo.svg";

export const Logo = () => {
  return (
    <Link href="/" className="w-[120px] md:w-[140px]">
      <Image
        alt="Logo"
        src={logo}
        sizes="100vw"
        // Make the image display full width
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </Link>
  );
};

export const LogoSmall = () => {
  return (
    <Link href="/" className="w-[64px]">
      <Image
        alt="Logo"
        src={logo2}
        sizes="100vw"
        // Make the image display full width
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </Link>
  );
};
