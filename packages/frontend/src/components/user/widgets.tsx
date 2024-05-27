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
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/user";

export default function UserButton () {
  const { data: session } = useSession();
  const user = session?.user;

  const userStore = useUserStore();

  const { data: userData } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => userStore.findUserById(user?.id!),
    enabled: !!user?.id,
  });

  if (!user) {
    return <SignInButton />;
  }

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
        {userData ? (
          <DropdownMenuLabel className="text-base leading-tight">
            <p>{userData?.firstName}</p>
            <p>{userData?.lastName}</p>
          </DropdownMenuLabel>
        ) : (
          <div className="px-6 py-4 text-sm font-base">Жүктелуде...</div>
        )}
        <DropdownMenuSeparator />
        {user.role === "USER" && (
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
