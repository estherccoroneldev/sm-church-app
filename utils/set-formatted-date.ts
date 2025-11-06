import { Timestamp } from '@react-native-firebase/firestore';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const setFormattedDate = (date: Timestamp): string => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let formattedDate = 'N/A';
  if (date && typeof date.toDate === 'function') {
    const jsDate = date.toDate();
    const localDate = toZonedTime(jsDate, userTimeZone);
    formattedDate = format(localDate, 'PPpp');
  }

  return formattedDate;
};
