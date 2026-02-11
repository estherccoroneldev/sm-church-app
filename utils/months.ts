const spanish = [
  'Todos',
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

// const english = [
//   'All',
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];

const english = [
  'All',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default {
  spanish,
  english,
} as const;

// TO DO: Dinamic way
// import { format, setMonth } from 'date-fns';
// import { enUS } from 'date-fns/locale';

// const getMonthsInFormat = (pattern: string, locale: any) => {
//   return Array.from({ length: 12 }, (_, i) =>
//     format(setMonth(new Date(), i), pattern, { locale })
//   );
// };

// const months = getMonthsInFormat('MMM', enUS);
// console.log(months);
// Resultado: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
