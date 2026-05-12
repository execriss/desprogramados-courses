import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';
import * as authService from '../services/authService';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  isLoggedIn: false,

  initialize: async () => {
    const session = await authService.getSession();
    set({ session, user: session?.user ?? null, isLoggedIn: !!session, isLoading: false });

    authService.onAuthStateChange(async (_event, session) => {
      set({ session, user: session?.user ?? null, isLoggedIn: !!session });
    });
  },

  login: async (email, password) => {
    const { session } = await authService.signIn(email, password);
    set({ session, user: session?.user ?? null, isLoggedIn: !!session });
  },

  register: async (email, password, name) => {
    const { session } = await authService.signUp(email, password, name);
    set({ session, user: session?.user ?? null, isLoggedIn: !!session });
  },

  logout: async () => {
    await authService.signOut();
    set({ user: null, session: null, isLoggedIn: false });
  },
}));
