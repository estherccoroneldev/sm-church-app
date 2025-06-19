export type Event = {
  id: string;
  name: string;
  description: string;
  date: string;
  contactName?: string;
  place?: string;
  imageUrl?: string;
  downloadUrl?: string;
  isActive?: boolean;
};
