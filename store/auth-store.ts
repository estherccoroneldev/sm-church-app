import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { create } from 'zustand';
import { UserProfile } from '../@types/user';

interface AuthState {
  user: FirebaseAuthTypes.User | null;
  userData: UserProfile | null;
  initializing: boolean;
  isGuest: boolean;

  isAuthenticated: boolean;

  setAuthUser: (user: FirebaseAuthTypes.User | null) => void;
  setUserData: (data: UserProfile | null) => void;
  updateAvatarUrl: (url: string) => void;
  setInitializing: (isInitializing: boolean) => void;
  signIn: (userData: UserProfile) => void;
  signInAsGuest: (user: FirebaseAuthTypes.User) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userData: null,
  initializing: true,
  isAuthenticated: false,
  isGuest: false,

  setAuthUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isGuest: !user ? false : get().isGuest,
    }),

  setUserData: (userData) => set({ userData }),
  updateAvatarUrl: (url) =>
    set((state) => ({
      userData: state.userData ? { ...state.userData, avatarUrl: url } : null,
    })),
  setInitializing: (initializing) => set({ initializing }),

  signIn: (userData) =>
    set((state) => ({
      userData: { ...state.userData, ...userData } as UserProfile,
      isAuthenticated: true,
      isGuest: false,
    })),

  signInAsGuest: (user) => {
    set({
      user,
      isGuest: true,
      isAuthenticated: true,
      userData: null,
    });
  },

  /**
   * Signs out the user from Firebase and resets the store state.
   */
  signOut: async () => {
    try {
      if (get().user) {
        await auth().signOut();
      }
    } catch (error) {
      console.error('Error signing out:', error);
      // Optional: Handle error (e.g., alert the user)
    } finally {
      // Always reset local state regardless of Firebase success
      set({
        user: null,
        userData: null,
        isAuthenticated: false,
        isGuest: false,
      });
    }
  },
}));
