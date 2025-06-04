import { AuthService } from '@/client-api';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const data = await request.json();
  const { accessToken } = await AuthService.googleAuth({
    idToken: data.credential,
  });
  const jwt = accessToken;
  cookies().set('jwt', jwt, {
    httpOnly: true,
    maxAge: 24 * 60 * 60,
    sameSite: 'strict',
  });
  return NextResponse.json({
    jwt,
  });
}
