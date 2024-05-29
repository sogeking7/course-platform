"use client";

import { CircleUserRound, LogIn, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserButton() {
  const { data: session, status } = useSession();
  const user = session?.user;

  console.log("user", user);
  console.log("session", session);
  if (status === "loading" || !user) {
    return <SignInButton />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"reset"}
          className={cn("max-sm:py-2.5 max-sm:px-2.5 sm:py-2.5 sm:px-5 ")}
          variant={"ghost"}
          asChild
        >
          <Link href="/home/profile">
            <label className="max-sm:hidden">Жеке профиль</label>
            <CircleUserRound size={22} className="sm:ml-2" />
          </Link>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top">
        <DropdownMenuLabel className="text-base leading-tight">
          <p>{user.lastName}</p>
          <p>{user.firstName}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user?.role === "USER" && (
          <>
            <Link href={"/home/my-courses"}>
              <DropdownMenuItem className="bg-transparent hover:!bg-neutral-100 hover:!text-neutral-700">
                Менің курстарым
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </>
        )}
        <Link href={"/home/profile"}>
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

export const SignOutButton = () => {
  return (
    <Button
      size={"reset"}
      className={cn("py-2.5 px-5")}
      variant={"ghost"}
      onClick={() => signOut()}
    >
      <LogOut className="mr-2" size={20} />
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
      <LogIn className="mr-2" size={20} />
      Кіру
    </Button>
  );
};
