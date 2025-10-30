export type Announcement = {
  id: string;
  title: string;
  description: string;
  startDate: string; // timestamp in ISO format
  endDate: string; // timestamp in ISO format
  contactName?: string;
  place?: string;
  imageUrl?: string;
  downloadUrl?: string;
  isActive?: boolean;
};
