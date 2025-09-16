import { Timestamp } from 'firebase/firestore';

export type UserProfile = {
  uid: string;
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'member' | 'apprentice' | 'guest';
  gender?: 'male' | 'female';
  olderThan13Years?: 'yes' | 'no';
  acceptedTermsCond?: 'yes' | 'no';
  ministryIds?: string[]; // references to Ministry documents
  // avatarUrl?: string;
  // isActive?: boolean;
  isVerified?: boolean;
  knowMoreAboutMinistries?: 'yes' | 'no';
  createdAt: Timestamp;
  updatedAt?: Timestamp;
};
