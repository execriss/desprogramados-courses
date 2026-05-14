import { create } from 'zustand';
import type { Theme } from '../types';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const savedTheme = (typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null) as Theme | null;

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: savedTheme === 'light' ? 'light' : 'dark',
  setTheme: (theme) => set({ theme }),
}));
