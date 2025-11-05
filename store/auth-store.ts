import auth from '@react-native-firebase/auth';

import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  role?: 'member' | 'admin' | 'coordinator' | 'guest';
  isGuest: boolean;
}

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
      name: 'Invitado',
      role: 'guest',
      isGuest: true,
    };
    set({ user: guestUser, isAuthenticated: true });
  },
  signIn: (user: User) => {
    set({ user, isAuthenticated: true });
  },
  signOut: async () => {
    await auth().signOut();
    set({ user: null, isAuthenticated: false });
  },
}));

export { useAuthStore as useAuth };
