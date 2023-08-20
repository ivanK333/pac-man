import { Routes, Route, Navigate } from 'react-router';

import Header from '../../components/Header/Header';
import Profile from '../../components/Profile/Profile';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import GameOver from '../../pages/GameOver/GameOver';
import { ROUTES } from '../../constants/routes';

export const Main = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={ROUTES.main.profile} element={<Profile />} />
        <Route path={ROUTES.main.root} element={<div>Main</div>} />
        <Route path={ROUTES.main.game} element={<div>Game</div>} />
        <Route path={ROUTES.main.gameOver} element={<GameOver />} />
        <Route path={ROUTES.main.forum} element={<div>Forum</div>} />
        <Route path={ROUTES.main.lead} element={<Leaderboard />} />
        <Route path={ROUTES.main.lead} element={<Leaderboard />} />
        <Route path={ROUTES.main.lead} element={<Leaderboard />} />
        <Route
          path="/*"
          element={<Navigate replace to={ROUTES.error.notFound} />}
        />
      </Routes>
    </>
  );
};
