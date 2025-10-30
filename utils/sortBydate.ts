export default function sortByDate<T extends { startDate: string }>(
  array: T[],
  order: 'asc' | 'desc'
) {
  return array.sort((a, b) => {
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
}
