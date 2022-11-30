import { useState, useEffect, useCallback } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setStoredValue = useCallback(
    (val) => {
      try {
        const valueToStore = val instanceof Function ? val(value) : val;
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    },
    [value, key]
  );

  useEffect(() => {
    setStoredValue(value);
  }, [value, setStoredValue]);

  return [value, setValue];
}
