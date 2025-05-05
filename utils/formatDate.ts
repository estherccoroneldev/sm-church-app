import { format } from 'date-fns';

export const formatDate = (date: string | Date) => {
  const parsedDate = new Date(date);
  return format(parsedDate, 'MMMM d, yyyy');
};
