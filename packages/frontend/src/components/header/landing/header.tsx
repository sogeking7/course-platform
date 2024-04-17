import { Logo } from '../../logo';

import { LoginButton } from '../../user/login-btn';
import { Navigations } from './navigations';

const links = [
  {
    title: 'Кімдерге арналған',
    href: '/',
  },
  {
    title: 'Курстар',
    href: '/',
  },
  {
    title: 'Неліктен бізде тандайды',
    href: '/',
  },
  {
    title: 'Біз туралы',
    href: '/',
  },
];

export const Header = () => {
  return (
    <header className="py-10">
      <nav className="container">
        <ul className="flex justify-between items-center">
          <Logo />
          <Navigations links={links} />
          <LoginButton />
        </ul>
      </nav>
    </header>
  );
};
