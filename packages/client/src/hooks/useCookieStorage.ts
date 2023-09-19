import { useState, useEffect } from 'react';

import { getCookie } from '../utils/cookie';

export function useCookieStorage(nameItem: string) {
  const [value, setValue] = useState(getCookie(nameItem));

  useEffect(() => {
    setValue(getCookie(nameItem));
  }, [nameItem]);

  return value;
}
