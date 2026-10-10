export type CalendarWeek = readonly (number | null)[];

/** Monday-first weeks for a month; `monthIndex` is 0-based like `Date`. */
export function monthGrid(year: number, monthIndex: number): CalendarWeek[] {
  const leading = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  const days = new Date(year, monthIndex + 1, 0).getDate();
  const cells: (number | null)[] = Array(leading).fill(null);
  for (let day = 1; day <= days; day++) cells.push(day);
  while (cells.length % 7) cells.push(null);
  const weeks: CalendarWeek[] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}
