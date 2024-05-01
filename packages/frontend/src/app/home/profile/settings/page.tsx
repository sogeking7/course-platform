import { MyContainer } from "@/components/container";
import { LogoutButton } from "@/components/user/user-btn";
import { getSession } from "@/lib";

export default async function ProfileSettings() {
  const session = await getSession();
  const user = session?.user;
  return (
    <MyContainer>
      {user ? (
        <div>
          {user.email}
          <LogoutButton />
        </div>
      ) : (
        <div>You must be logged in.</div>
      )}
    </MyContainer>
  );
}
