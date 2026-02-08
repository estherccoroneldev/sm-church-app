import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type UserProfile = {
  uid: string;
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'member' | 'coordinator' | 'guest';
  gender?: 'male' | 'female' | 'no information';
  olderThan13Years?: 'yes' | 'no';
  acceptedTermsCond?: 'yes' | 'no';
  ministryIds?: string[]; // references to Ministry documents
  isPhoneVerified?: boolean;
  avatarUrl?: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt?: FirebaseFirestoreTypes.Timestamp;
};
