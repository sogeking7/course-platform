"use client";

import { CircleUserRound, LogIn, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TypographyH3, TypographyLarge, TypographyP } from "../ui/typography";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserButton = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role;

  const fullname = user?.firstName + " " + user?.lastName;

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size={"reset"}
            className={cn("py-2.5 px-5")}
            variant={"ghost"}
            asChild
          >
            <Link href="/home/profile">
              <label className="font-normal">Жеке профиль</label>
              <CircleUserRound strokeWidth={1.75} size={22} className="ml-2" />
            </Link>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top">
          <DropdownMenuLabel className="text-base leading-tight">
            {fullname}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {role === "USER" && (
            <>
              <Link href={"/home/my-courses"}>
                <DropdownMenuItem className="bg-transparent hover:!bg-neutral-100 hover:!text-neutral-700">
                  Менің курстарым
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
            </>
          )}
          <Link href={"/home/profile/settings"}>
            <DropdownMenuItem className="bg-transparent hover:!bg-neutral-100 hover:!text-neutral-700">
              Баптаулар
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={() => signOut()}
            className="bg-transparent hover:!bg-neutral-100 hover:!text-neutral-700"
          >
            Шығу
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return <SignInButton />;
};

export const SignOutButton = () => {
  return (
    <Button
      size={"reset"}
      className={cn("py-2.5 px-5")}
      variant={"ghost"}
      onClick={() => signOut()}
    >
      <LogOut className="mr-2" size={22} />
      Шығу
    </Button>
  );
};

export const SignInButton = () => {
  return (
    <Button
      size={"reset"}
      className={cn("py-2.5 px-5")}
      onClick={() => signIn()}
      variant={"ghost"}
    >
      <LogIn className="mr-2" size={22} />
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
    <div className="rounded-sm border-neutral-200 bg-white border p-5 space-y-3">
      <TypographyH3>Profile information</TypographyH3>
      <TypographyP>Aты: {user.firstName}</TypographyP>
      <TypographyP>Тегі: {user.lastName}</TypographyP>
      <TypographyP>Роль: {user.role}</TypographyP>
      <TypographyP>Почта: {user.email}</TypographyP>
    </div>
  );
};
