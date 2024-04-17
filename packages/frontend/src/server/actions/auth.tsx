'use server';

import { encrypt } from '@/lib';
import { loginSchema } from '@/lib/formSchema';
import { cookies } from 'next/headers';
import { z } from 'zod';

export const login = async (values: z.infer<typeof loginSchema>) => {
  const user = { ...values };

  const expires = new Date(Date.now() + 1000 * 10);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie.
  cookies().set('session', session, { expires, httpOnly: true });
};

export const logout = async () => {};
