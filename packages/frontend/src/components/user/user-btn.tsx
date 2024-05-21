'use client';

import { CircleUserRound, LogIn, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TypographyLarge, TypographyP } from "../ui/typography";
import { signIn, signOut, useSession } from "next-auth/react";

export const UserButton = () => {
  const { data: session } = useSession();
  const user = session?.user;

  if (user) {
    return (
      <Button
        size={"reset"}
        className={cn("py-3 px-5")}
        variant={"ghost"}
        asChild
      >
        <Link href="/home/profile">
          Жеке профиль
          <CircleUserRound strokeWidth={1.75} className="ml-2 h-6 w-6" />
        </Link>
      </Button>
    );
  }
  return <SignInButton />;
};

export const SignOutButton = () => {
  return (
    <Button variant={"default"} onClick={() => signOut()}>
      <LogOut className="mr-2 h-4 w-4" />
      Шығу
    </Button>
  );
};

export const SignInButton = () => {
  return (
    <Button variant={"ghost"} onClick={() => signIn()}>
      <LogIn className="mr-2 h-4 w-4" />
      Кіру
    </Button>
  );
};

export const UserInfoBox = () => {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    return <div>You must be logged in.</div>;
  }
  return (
    <div className="rounded-sm bg-neutral-100 p-5 space-y-3">
      <TypographyP>
        {user.firstName}
      </TypographyP>
      <TypographyP>
        {user.lastName}
      </TypographyP>
      <TypographyLarge>
        {user.email}</TypographyLarge>
      <SignOutButton />
    </div>
  );
};
