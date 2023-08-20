import { useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router';

import { Auth } from './routes/Auth/Auth';
import { Main } from './routes/Main/Main';
import { ROUTES } from './constants/routes';

const SERVER_PORT = __SERVER_PORT__ || 3001;
console.log('__SERVER_PORT__', __SERVER_PORT__);

const App = () => {
  // Флаг для проверки авторизации, можно хронить в localStorage
  const isAuthenticated = true;

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${SERVER_PORT}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Main />
            ) : (
              <Navigate replace to={ROUTES.auth.login} />
            )
          }
        />
        <Route
          path={`${ROUTES.auth.root}/*`}
          element={
            !isAuthenticated ? (
              <Auth />
            ) : (
              <Navigate replace to={ROUTES.main.root} />
            )
          }
        />

        <Route path={ROUTES.error.internalError} element={<div>505</div>} />
        <Route path={ROUTES.error.notFound} element={<div>404</div>} />
      </Routes>
    </div>
  );
};

export default App;
