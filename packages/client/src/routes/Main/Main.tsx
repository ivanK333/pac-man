import { Routes, Route, Navigate } from 'react-router';

import styles from './styles.module.scss';
import Header from '../../components/Header/Header';
import GameOver from '../../pages/GameOver/GameOver';
import StartGame from '../../pages/StartGame/StartGame';
import LoaderGame from '../../pages/LoaderGame/LoaderGame';
import { ROUTES } from '../../constants/routes';
import Profile from '../../pages/Profile/Profile';
import Leaderboard from '../../pages/Leaderboard/Leaderboard';

export const Main = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path={ROUTES.main.profile} element={<Profile />} />
          <Route path={ROUTES.main.root} element={<StartGame />} />
          <Route path={ROUTES.main.game} element={<LoaderGame />} />
          <Route path={ROUTES.main.gameOver} element={<GameOver />} />
          <Route path={ROUTES.main.forum} element={<div>Forum</div>} />
          <Route path={ROUTES.main.lead} element={<Leaderboard />} />

          <Route
            path="/*"
            element={<Navigate replace to={ROUTES.error.notFound} />}
          />
        </Routes>
      </main>
    </>
  );
};
