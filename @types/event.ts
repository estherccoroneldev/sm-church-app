// TO DO: review the data scope and types later w Rev.
export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  place?: string;
  department?: string;
  imageUrl?: string;
  downloadUrl?: string;
  isActive?: boolean;
};
