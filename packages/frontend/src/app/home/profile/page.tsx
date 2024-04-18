import { HomeHeader } from '@/components/home-header';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/user/user-btn';

import { getSession } from '@/lib';
import { logout } from '@/server/actions/auth';
import { Link, LogOut } from 'lucide-react';
import { redirect } from 'next/dist/server/api-utils';

export default async function ProfilePage() {
  const session = await getSession();
  const user = session?.user;

  return (
    <div>
      <HomeHeader title={'Profile'} />
      <div className="p-8">
        {user ? (
          <div>
            {user.email}
            <LogoutButton />
          </div>
        ) : (
          <div>You must be logged in.</div>
        )}
      </div>
    </div>
  );
}
