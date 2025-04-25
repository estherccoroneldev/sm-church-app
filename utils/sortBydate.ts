export default function sortByDate<T extends { date: string }>(array: T[], order: 'asc' | 'desc') {
  return array.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
}
