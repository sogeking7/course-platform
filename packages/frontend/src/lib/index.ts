import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

export const encrypt = async (paylod: any) => {
  return await new SignJWT(paylod)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
};

export const decrypt = async (token: string): Promise<any> => {
  const { payload } = await jwtVerify(token, key, {
    algorithms: ['HS256'],
  });
  return payload;
};

export const getSession = async () => {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
};

export const updateSession = async (request: NextRequest) => {
  const session = cookies().get('session')?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const res = NextResponse.next();
  res.cookies.set('session', await encrypt(parsed), {
    expires: parsed.expires,
    httpOnly: true,
  });

  return res;
};
