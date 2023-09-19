import { useState, useEffect } from 'react';

export function useReadLocalStorage(nameItem: string) {
  if (localStorage === undefined) return;
  const [value, setValue] = useState(localStorage.getItem(nameItem));

  useEffect(() => {
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
