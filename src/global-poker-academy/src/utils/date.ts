export function formatDate(inputDateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(inputDateString);
  return date.toLocaleDateString('en', options);
}
