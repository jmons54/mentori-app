'use client';

import * as clientApi from '@/client-api';
import { useState } from 'react';

export function useServerApi(defaultJwt?: string) {
  const [jwt, setJwt] = useState<string>(defaultJwt ?? '');

  clientApi.OpenAPI.BASE = process.env.NEXT_PUBLIC_SERVER_URL as string;
  if (jwt) {
    clientApi.OpenAPI.TOKEN = jwt;
  }

  return {
    setJwt,
    jwt,
  };
}
