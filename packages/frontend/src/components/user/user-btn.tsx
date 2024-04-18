import { getSession } from '@/lib';
import { CircleUserRound, LogIn, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { logout } from '@/server/actions/auth';

export const UserButton = async () => {
  const session = await getSession();
  const user = session?.user;

  if (user) {
    return (
      <Button variant={'ghost'} asChild>
        <Link href="/home/profile">
          Жеке профиль
          <CircleUserRound className="ml-2 h-6 w-6" />
        </Link>
      </Button>
    );
  }
  return <LoginButton />;
};

export const LogoutButton = () => {
  return (
    <form
      action={async () => {
        'use server';
        await logout();
      }}
    >
      <Button type="submit" variant={'ghost'}>
        <div className="flex gap-2 items-center">
          <LogOut className="h-4 w-4" />
          Шығу
        </div>
      </Button>
    </form>
  );
};

const LoginButton = () => {
  return (
    <>
      <Button variant={'ghost'} asChild>
        <Link href="/login">
          <LogIn className="mr-2 h-4 w-4" />
          Кіру
        </Link>
      </Button>
    </>
  );
};
