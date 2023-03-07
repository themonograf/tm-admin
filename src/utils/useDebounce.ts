import React from "react";

export default function useDebounce<
  T extends Record<string | number, string | number>,
>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = React.useState<T | null>(null);

  React.useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
