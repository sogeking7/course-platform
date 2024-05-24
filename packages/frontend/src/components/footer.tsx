import { Instagram, MapPin, Phone } from "lucide-react";
import { Logo, LogoHome } from "./logo";

const links = [
  // {
  //   title: "г.Алматы , ул Кошкарбаев 62",
  //   icon: <MapPin size={18} />,
  // },
  {
    title: "+7 708 177 5826",
    icon: <Phone size={18} />,
  },
  {
    title: "shoqan.kz",
    link: "https://www.instagram.com/shoqan.kz/",
    icon: <Instagram size={18} />,
  },
];

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full pt-10 pb-7 border-y bg-white border-neutral-300">
      <nav className="container flex flex-col gap-5 justify-center items-center">
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
        <ul className="flex sm:flex-row flex-col items-center gap-6 list-disc text-sm">
          <li>
            <a className="hover:underline cursor-pointer font-bold">About</a>
          </li>
          <li>
            <a className="hover:underline cursor-pointer font-bold">
              Terms of Service
            </a>
          </li>
          <li>
            <a className="hover:underline cursor-pointer font-bold">
              Privacy Policy
            </a>
          </li>
        </ul>
        <div className="flex gap-2 items-center">
          <Logo />
          <span className="text-xs">© 2024 shoqan-edu.kz</span>
        </div>
      </nav>
    </footer>
  );
};
