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
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function UserButton() {
  const { data: session, status } = useSession();
  const user = session?.user;

  // console.log("user", user);
  // console.log("session", session);
  if (status === "loading" || !user) {
    return <SignInButton />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={""} />
          <AvatarFallback>
            {user.firstName.charAt(0) + user.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {/* <Image
          unoptimized
          width={40}
          height={40}
          className="border border-[#1f2d5a] w-10 h-10 rounded-full"
          src={user?.profilePictureLink || "/placeholder.jpg"}
          alt="user"
        /> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top">
        <DropdownMenuLabel>
          <p className="text-base leading-tight !font-semibold">
            {user.lastName}
          </p>
          <p className="text-base leading-tight !font-semibold">
            {user.firstName}
          </p>
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
            Жеке ақпарат
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
      // variant={"ghost"}
    >
      <LogIn className="mr-2" size={20} />
      Кіру
    </Button>
  );
};
