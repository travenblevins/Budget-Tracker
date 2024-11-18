import { useState, useEffect } from 'react';

export function useSessionData(key, defaultValue) {
  const [state, setState] = useState(() => {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}