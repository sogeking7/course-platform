import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export const LoginButton = () => {
  return (
    <>
      <Button variant={'ghost'} asChild>
        <Link href="/login">
          <LogOut className="mr-2 h-4 w-4" />
          Кіру
        </Link>
      </Button>
    </>
  );
};
