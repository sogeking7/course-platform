import { Instagram, MapPin } from 'lucide-react';
import { Logo } from './logo';

const links = [
  {
    title: 'г.Алматы , ул Кошкарбаев 62',
    icon: <MapPin size={20} />,
  },
  {
    title: 'example.study',
    icon: <Instagram size={20} />,
  },
  {
    title: 'Example study',
    icon: null,
  },
];

export const Footer = () => {
  return (
    <footer className="py-10 bg-my_cyan">
      <nav className="container flex justify-between items-center">
        <Logo />
        <ul className="flex gap-4 list-none">
          {links.map((link) => (
            <li key={link.title} className="flex gap-2 items-center">
              {link.icon}
              {link.title}
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};
