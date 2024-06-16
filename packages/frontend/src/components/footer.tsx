import { Instagram, Phone } from "lucide-react";
import { Logo } from "./logo";
import Link from "next/link";

const links = [
  // {
  //   title: "г.Алматы , ул Кошкарбаев 62",
  //   icon: <MapPin size={20} />,
  // },
  {
    title: "+7 708 177 5826",
    icon: <Phone size={20} />,
  },
  {
    title: "shoqan.kz",
    link: "https://www.instagram.com/shoqan.kz/",
    icon: <Instagram size={20} />,
  },
];

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full pt-10 pb-7 border rounded-t-3xl bg-white border-neutral-300">
      <nav className="container flex flex-col gap-8 justify-center items-center">
        {/* <ul className="flex gap-6 list-none">
          {links.map((link) => (
            <li key={link.title}>
            <a
            href={link?.link}
            className="text-sm flex gap-1 items-center cursor-pointer hover:underline"
            >
                {link.icon}
                <label className="leading-tight">{link.title}</label>
              </a>
            </li>
          ))}
        </ul> */}
        <ul className="flex sm:flex-row flex-col items-center gap-6 text-sm">
          <li>
            <Link href="/about" className="hover:underline cursor-pointer ">
              Біз туралы
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:underline cursor-pointer ">
              Құпиялылық саясаты
            </Link>
          </li>
        </ul>
        <div className="flex gap-4 items-center max-sm:flex-col justify-center">
          <Logo />
          <span className="text-sm">
            Copyright © 2024 shoqan-edu.kz. Барлық құқықтар қорғалған.
          </span>
        </div>
      </nav>
    </footer>
  );
};
