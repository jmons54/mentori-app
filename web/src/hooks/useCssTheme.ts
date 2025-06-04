import { useEffect, useState, SetStateAction, Dispatch } from 'react';
import { cssThemeKey } from '@/services/css-theme';

export function useCssTheme(): [
  boolean | undefined,
  Dispatch<SetStateAction<boolean | undefined>>
] {
  const [lightMode, setLightMode] = useState<boolean>();

  useEffect(() => {
    const lightMode = document.documentElement.className.match(/light/);
    setLightMode(!!lightMode);
  }, []);

  useEffect(() => {
    if (lightMode !== undefined) {
      document.cookie = `${cssThemeKey}=${lightMode ? 'light' : 'dark'};path=/`;
      if (lightMode) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    }
  }, [lightMode]);

  return [lightMode, setLightMode];
}
