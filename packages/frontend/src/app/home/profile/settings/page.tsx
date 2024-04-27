import { HomeHeader } from '@/components/header/home/header';
import { LogoutButton } from '@/components/user/user-btn';
import { getSession } from '@/lib';

export default async function ProfileSettings() {
  const session = await getSession();
  const user = session?.user;
  return (
    <div>
      <HomeHeader title={'Settings'} />
      <div className="p-12">
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
