import { Timestamp } from 'firebase/firestore';

export type UserProfile = {
  uid: string;
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'member' | 'apprentice'; // Default roles
  createdAt: Timestamp;
  updatedAt?: Timestamp;
};
