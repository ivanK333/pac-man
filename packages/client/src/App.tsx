import { useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router';

import { Auth } from './routes/Auth/Auth';
import { Main } from './routes/Main/Main';
import { ROUTES } from './constants/routes';
import NotFoundPage from './pages/404/NotFoundPage';
import EternalErrorPage from './pages/500/EternalErrorPage';

const App = () => {
  // Флаг для проверки авторизации, можно хронить в localStorage
  const isAuthenticated = true;

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  return (
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

      <Route path={ROUTES.error.internalError} element={<EternalErrorPage />} />
      <Route path={ROUTES.error.notFound} element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
