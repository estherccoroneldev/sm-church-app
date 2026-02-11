import { parse } from 'date-fns';
import { enUS } from 'date-fns/locale'; // Importa el locale

const format = 'MMM d, yyyy, hh:mm:ss a';
export const parseDate = (input: string, formatInput = format) => {
  return parse(input, formatInput, new Date(), { locale: enUS });
};
