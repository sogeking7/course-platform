'use client';

import Link from 'next/link';
import { Logo } from './logo';
import { Button } from './ui/button';
import { Apple } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { DarkModeSwitch } from './darkmode-switch';

const links = [
  {
    title: 'Барлық курстар',
    href: '/home/all-courses',
    disabled: false,
  },
  {
    title: 'Менің курстарым',
    href: '/home/my-courses',
    disabled: false,
  },
  {
    title: 'Байқау тесті',
    href: '#',
    disabled: true,
  },
];

export const SideBar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-full h-full p-5 bg-my_cyan min-h-screen space-y-8">
      <div className="w-full flex justify-center py-10 border">
        <Logo />
      </div>
      <nav>
        <ul className="space-y-3 ">
          {links.map((item) => (
            <li className="w-full" key={item.title}>
              <Button
                disabled={item.disabled}
                className={cn(
                  'w-full justify-start',
                  pathname === item.href && 'bg-accent',
                )}
                variant={'ghost'}
                asChild
              >
                <Link href={item.href}>
                  <Apple className="mr-3" />
                  {item.title}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <DarkModeSwitch />
    </aside>
  );
};
