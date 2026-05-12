import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MockUser {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: MockUser | null;
  login: (data?: { name?: string; email?: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (data) =>
        set({
          isLoggedIn: true,
          user: {
            id: 'mock-1',
            name: data?.name?.trim() || 'Usuario Demo',
            email: data?.email || 'demo@learncraft.com',
          },
        }),
      logout: () => set({ isLoggedIn: false, user: null }),
    }),
    { name: 'lc-auth' }
  )
);
