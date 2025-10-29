import { db } from 'config/firebase';
import { create } from 'zustand';
import { UserProfile } from '../@types/user';

const USER_COLLECTION = 'users';

interface UsersStore {
  users: UserProfile[];
  loading: boolean;
  error: string | null;
  fetchAllUsers: () => Promise<void>;
  // getUserById: (userId: string) => Promise<any | null>;
  // updateUserById: (userId: string, updatedData: Record<string, any>) => Promise<void>;
}

export const useUsersStore = create<UsersStore>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchAllUsers: async () => {
    set({ loading: true, error: null });
    try {
      const usersCollection = db.collection(USER_COLLECTION).where('role', '==', 'member');
      const snapshot = await usersCollection.get();
      set({ users: snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }) as UserProfile) });
    } catch (err) {
      console.error(err);
      set({ error: 'Failed to fetch users' });
    } finally {
      set({ loading: false });
    }
  },

  // getUserById: async (userId: string) => {
  //     set({ loading: true, error: null });

  //     try {
  //         const userDoc = db.collection(USER_COLLECTION).doc(userId)
  //         const snapshot = await userDoc.get()

  //         if (snapshot.exists()) {
  //             return { id: snapshot.id, ...snapshot.data() };
  //         } else {
  //             throw new Error('User not found');
  //         }
  //     } catch (err) {
  //         console.error(err);
  //         set({ error: 'Failed to fetch user' });
  //         return null;
  //     } finally {
  //         set({ loading: false });
  //     }
  // },

  // updateUserById: async (userId: string, updatedData: Record<string, any>) => {
  //     set({ loading: true, error: null });

  //     try {
  //         const userDoc = doc(db, 'users', userId);
  //         await updateDoc(userDoc, updatedData);

  //         // Update the local state
  //         const users = get().users;
  //         const userIndex = users.findIndex(user => user.id === userId);
  //         if (userIndex !== -1) {
  //             const updatedUsers = [...users];
  //             updatedUsers[userIndex] = { ...updatedUsers[userIndex], ...updatedData };
  //             set({ users: updatedUsers });
  //         }
  //     } catch (err) {
  //         console.error(err);
  //         set({ error: 'Failed to update user' });
  //     } finally {
  //         set({ loading: false });
  //     }
  // },
}));
