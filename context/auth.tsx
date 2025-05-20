// import { create } from 'zustand';

// // Define the User type
// type User = {
//   id: string;
//   name: string;
//   isGuest: boolean;
// };

// // Define the Authentication State
// interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
//   signInAsGuest: () => void;
//   signOut: () => void;
// }

// // Create Zustand store
// const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   isAuthenticated: false,
//   signInAsGuest: () => {
//     const guestUser: User = {
//       id: `guest-${Date.now()}`,
//       name: 'Guest User',
//       isGuest: true,
//     };
//     set({ user: guestUser, isAuthenticated: true });
//   },
//   signOut: () => {
//     set({ user: null, isAuthenticated: false });
//   },
// }));

// // Create Context
// const AuthContext = createContext<AuthState | null>(null);

// // Create Provider Component
// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const authState = useAuthStore();

//   return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
// };

// // Custom hook to use auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export default useAuthStore;

// Remove all Context-related code and export only:
// export { useAuthStore as useAuth };
