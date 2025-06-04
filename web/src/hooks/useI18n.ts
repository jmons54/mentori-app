'use client';

import i18n from '@/i18n';
import { initReactI18next } from 'react-i18next';
import { useEffect, useState } from 'react';

export function useI18n() {
  const [loadI18n, setLoadI18n] = useState(true);
  useEffect(() => {
    i18n.use(initReactI18next);
    i18n.changeLanguage(document.body.dataset.locale).then(() => {
      setLoadI18n(false);
    });
  }, []);
  return {
    t: i18n.t,
    loadI18n,
  };
}
