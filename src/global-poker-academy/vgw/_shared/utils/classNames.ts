type ClassValue = string | undefined | null | false | { [className: string]: boolean };

export default function classNames(...args: ClassValue[]): string {
  return args
    .flatMap((arg) => {
      if (typeof arg === 'string' && arg) {
        return arg;
      } else if (typeof arg === 'object' && arg !== null) {
        return Object.keys(arg).filter((key) => arg[key]);
      } else {
        return [];
      }
    })
    .join(' ');
}
