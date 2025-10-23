export type Ministry = {
  id: string;
  title: string;
  description: string;
  date?: string;
  place?: string;
  phone?: string;
  email?: string;
  coordinatorId?: string;
  acceptedMembers?: string[];
  pendingMembers?: string[];
  rejectedMembers?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  groupLink?: string;
  address?: string;
  imageUrl?: string;
  downloadUrl?: string;
};

export type MinistryChangeType =
  | 'PENDING_MEMBER_ARRAY_UPDATED'
  | 'NEW_MEMBER_ADDED'
  | 'MEMBER_REMOVED';
