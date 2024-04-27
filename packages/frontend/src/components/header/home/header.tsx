import { Settings } from 'lucide-react';
import { Button } from '../../ui/button';
import { UserButton } from '../../user/user-btn';
import Link from 'next/link';

export const HomeHeader = ({ title }: { title: string }) => {
  return (
    <header className="px-12 py-8 w-full">
      <div className="flex items-center w-full justify-between">
        <h1 className="text-3xl text-slate-900 font-semibold">{title}</h1>
        <div className="gap-5 flex items-center">
          <Button size={'icon'} variant={'ghost'} asChild>
            <Link href="/home/profile/settings">
              <Settings className="w-6 h-6" />
            </Link>
          </Button>
          <UserButton />
        </div>
      </div>
    </header>
  );
};
