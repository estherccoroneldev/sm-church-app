import { parse } from 'date-fns';

const format = 'MMMM d, yyyy';
export const parseDate = (input: string, formatInput = format) => {
  return parse(input, formatInput, new Date());
};
