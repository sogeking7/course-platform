"use server";

import { encrypt } from "@/lib";
import { loginSchema } from "@/lib/formSchema";
import { redirect, useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const user = { ...values };

  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const session = await encrypt({ user, expires });

  await new Promise((resolve) => setTimeout(resolve, 4000));

  // Save the session in a cookie.
  cookies().set("session", session, { expires, httpOnly: true });
  redirect("/");
};

export const logout = async () => {
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/");
};
