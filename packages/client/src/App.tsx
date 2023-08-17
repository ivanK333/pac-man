// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react';

//import './App.css';
import { Routes, Route, useRoutes } from 'react-router';

import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import LoginForm from './pages/login/index.login';

const App = () => {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  const routes = [
    { path: '/login', element: <LoginForm />, showHeader: false },
    // { path: '/register', element: <RegisterForm />, showHeader: false },
    { path: '/profile', element: <Profile />, showHeader: true },
    { path: '/', element: <div>Game</div>, showHeader: true },
    { path: '/forum', element: <div>Forum</div>, showHeader: true },
    { path: '/lead', element: <div>Leaderboard</div>, showHeader: true },
  ];

  const routing = useRoutes(routes);

  return (
    <div className="App">
      {routing?.props.match?.route?.showHeader && <Header />}
      {routing}
    </div>
  );
};

export default App;
