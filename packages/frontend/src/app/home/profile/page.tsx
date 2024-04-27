import { HomeHeader } from '@/components/header/home/header';
import { Button } from '@/components/ui/button';
import { LogoutButton, UserInfoBox } from '@/components/user/user-btn';

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
      <div className="px-12">
        <UserInfoBox user={user} />
      </div>
    </div>
  );
}
