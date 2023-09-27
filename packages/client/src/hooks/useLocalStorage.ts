import { useState, useEffect } from 'react';

export function useReadLocalStorage(nameItem: string) {
  if (typeof window === 'object' || typeof window !== 'undefined') {
    const [value, setValue] = useState(localStorage.getItem(nameItem));

    useEffect(() => {
      const storageListener = () => {
        console.log('set');
        setValue(localStorage.getItem(nameItem));
      };

      window.addEventListener('storage', storageListener, false);
      return () => {
        window.removeEventListener('storage', storageListener, false);
      };
    }, []);

    return value;
  }
}
