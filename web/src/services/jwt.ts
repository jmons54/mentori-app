import { cookies } from 'next/headers';

export function getJwt() {
  return cookies().get('jwt')?.value;
}
