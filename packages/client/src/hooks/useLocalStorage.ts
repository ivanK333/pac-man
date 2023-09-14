import { useState, useEffect } from 'react';

export function useReadLocalStorage(nameItem: string) {
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
