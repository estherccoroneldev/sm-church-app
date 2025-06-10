import { create } from 'zustand';

export type User = {
  id: string;
  name: string;
  isGuest: boolean;
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signInAsGuest: () => void;
  signIn: (user: User) => void;
  signOut: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  signInAsGuest: () => {
    const guestUser: User = {
      id: `guest-${Date.now()}`,
      name: 'Usuario',
      isGuest: true,
    };
    set({ user: guestUser, isAuthenticated: true });
  },
  signIn: (user: User) => {
    set({ user, isAuthenticated: true });
  },
  signOut: () => {
    set({ user: null, isAuthenticated: false });
  },
}));

export { useAuthStore as useAuth };
