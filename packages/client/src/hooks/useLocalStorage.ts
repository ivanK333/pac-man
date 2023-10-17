import { useState, useEffect } from 'react';

export function useReadLocalStorage(nameItem: string) {
  const hasWindow = typeof window === 'object' || typeof window !== 'undefined';
  const [value, setValue] = useState(
    hasWindow ? localStorage.getItem(nameItem) : null,
  );

  useEffect(() => {
    if (!hasWindow) return;
    const storageListener = () => {
      setValue(localStorage.getItem(nameItem));
    };

    window.addEventListener('storage', storageListener, false);
    return () => {
      window.removeEventListener('storage', storageListener, false);
    };
  }, []);

  return value;
}
