import { useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';
import type { Theme } from '../types';

export function useTheme() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    setTheme(saved ?? 'dark');
  }, [setTheme]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
}
