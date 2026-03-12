import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BaseUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
}

interface AuthStore {
  user: BaseUser | null;
  token: string | null;
  setUser: (user: BaseUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' },
  ),
);
