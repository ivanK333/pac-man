import { useState } from 'react';

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login() {
    setIsAuthenticated(true);
  }

  return { isAuthenticated, login };
}

export default useAuth;
