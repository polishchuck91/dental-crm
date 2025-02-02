import { useState, useEffect } from "react";

/**
 * useDebounce - A custom React hook for debouncing values.
 *
 * @param value - The value to debounce (string, number, etc.).
 * @param delay - The debounce delay in milliseconds (default: 300ms).
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Cleanup the timeout if value changes before delay
    };
  }, [value, delay]);

  return debouncedValue;
}
