// TO DO: review the data scope and types later w Rev.
export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  contactName?: string;
  location?: string; // TO DO: standardize this later
  place?: string; // TO DO: remove this later
  imageUrl?: string;
  downloadUrl?: string;
  isActive?: boolean;
};
