// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react';

//import './App.css';
import { Routes, Route } from 'react-router';

import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';

const SERVER_PORT = __SERVER_PORT__ || 3001;
console.log('__SERVER_PORT__', __SERVER_PORT__);

const App = () => {
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
    <div className="App">
      <Header />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<div>Game</div>} />
        <Route path="/forum" element={<div>Forum</div>} />
        <Route path="/lead" element={<div>Leaderboard</div>} />
      </Routes>
    </div>
  );
};

export default App;
