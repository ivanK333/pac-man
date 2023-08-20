import { useEffect, useState } from 'react';

import { Routes, Route, Navigate } from 'react-router';

import AuthController from '../src/controllers/AuthController';
import { Auth } from './routes/Auth/Auth';
import { Main } from './routes/Main/Main';
import { ROUTES } from './constants/routes';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const fetchServerData = async () => {
  //     const url = `http://localhost:${__SERVER_PORT__}`;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     console.log(data);
  //   };

  //   fetchServerData();
  // }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await AuthController.fetchUser();
      if (response.success) setIsAuthenticated(true);
    };

    fetchUserData();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Main />
            ) : (
              <Navigate
                replace
                to={`${ROUTES.auth.root}/${ROUTES.auth.login}`}
              />
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
