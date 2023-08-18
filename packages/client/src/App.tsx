import { useEffect } from 'react';

import { Routes, Route } from 'react-router';

import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Register from './pages/Register/Register';
import Leaderboard from './components/Leaderboard/Leaderboard';

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
  return (
    <div className="app">
      {window.location.pathname !== '/register' ? <Header /> : ''}
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<div>Game</div>} />
        <Route path="/forum" element={<div>Forum</div>} />
        <Route path="/lead" element={<div>Leaderboard</div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<div>Login</div>} />

      </Routes>
    </div>
  );
};

export default App;
