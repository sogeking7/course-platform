import NextAuth from "next-auth/next";
import { User } from ".";

declare module "next-auth" {
  interface Session {
    user: User;
    // accessToken: string;
  }
}
