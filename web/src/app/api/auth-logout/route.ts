import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  cookies().delete('jwt');
  return NextResponse.json({
    success: true,
  });
}
