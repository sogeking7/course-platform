import { Logo } from '../../logo';
import { Navigations } from './navigations';
import { UserButton } from '@/components/user/user-btn';

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
          <UserButton />
        </ul>
      </nav>
    </header>
  );
};
