import { Routes, Route, Navigate } from 'react-router';

import Header from '../../components/Header/Header';
import Profile from '../../components/Profile/Profile';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import { ROUTES } from '../../constants/routes';
import GameField from '../../pages/Game/Game';

export const Main = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={ROUTES.main.profile} element={<Profile />} />
        <Route path={ROUTES.main.root} element={<GameField />} />
        <Route path={ROUTES.main.forum} element={<div>Forum</div>} />
        <Route path={ROUTES.main.lead} element={<Leaderboard />} />
        <Route
          path="/*"
          element={<Navigate replace to={ROUTES.error.notFound} />}
        />
      </Routes>
    </>
  );
};
