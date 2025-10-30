import { Timestamp } from '@react-native-firebase/firestore';
import { format } from 'date-fns';

export const setFormattedDate = (date: Timestamp): string => {
  let formattedDate = 'N/A';
  if (date && typeof date.toDate === 'function') {
    const jsDate = date.toDate();
    formattedDate = format(jsDate, 'PPpp');
    // formattedDate = format(jsDate, 'MMMM d, yyyy');
  }

  return formattedDate;
};
