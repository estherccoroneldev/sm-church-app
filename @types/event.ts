export type Event = {
  id: string;
  title: string;
  description: string;
  date: string; // timestamp in ISO format
  contactName?: string;
  place?: string;
  imageUrl?: string;
  downloadUrl?: string;
  isActive?: boolean;
};
