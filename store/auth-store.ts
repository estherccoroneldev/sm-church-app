import { create } from 'zustand';

// Define the User type
export type User = {
  id: string;
  name: string;
  isGuest: boolean;
};

// Define the Authentication State
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signInAsGuest: () => void;
  signIn: (user: User) => void;
  signOut: () => void;
}

// Create Zustand store
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  signInAsGuest: () => {
    const guestUser: User = {
      id: `guest-${Date.now()}`,
      name: 'Guest User',
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
