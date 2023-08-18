import { useEffect } from 'react';

import { useRoutes } from 'react-router';

import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Login from './pages/login/Login';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Register from './pages/Register/Register';

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
    { path: '/login', element: <Login />, showHeader: false },
    { path: '/register', element: <Register />, showHeader: false },
    { path: '/profile', element: <Profile />, showHeader: true },
    { path: '/', element: <div>Game</div>, showHeader: true },
    { path: '/forum', element: <div>Forum</div>, showHeader: true },
    { path: '/lead', element: <Leaderboard />, showHeader: true },
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
