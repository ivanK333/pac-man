import { Routes, Route, Navigate } from 'react-router';

import styles from './styles.module.scss';
import Header from '../../components/Header/Header';
import GameOver from '../../pages/GameOver/GameOver';
import { ROUTES } from '../../constants/routes';
import Profile from '../../pages/Profile/Profile';
import Leaderboard from '../../pages/Leaderboard/Leaderboard';
import Forum from '../../pages/Forum/Forum';
import NewGamesComponent from '../../components/ForumNestedComponents/NewGamesComponent';
import TechnologiesComponent from '../../components/ForumNestedComponents/TechnologiesComponent';
import DesignersComponent from '../../components/ForumNestedComponents/DesignersComponent';

export const Main = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path={ROUTES.main.profile} element={<Profile />} />
          <Route path={ROUTES.main.root} element={<div>Game</div>} />
          <Route path={ROUTES.main.gameOver} element={<GameOver />} />
          <Route path={ROUTES.main.forum.root}>
            <Route path={`/${ROUTES.main.forum.root}`} element={<Forum />} />
            <Route path={ROUTES.main.forum.root + '/*'} />
            <Route
              path={ROUTES.main.forum.games}
              element={<NewGamesComponent />}
            />
            <Route
              path={ROUTES.main.forum.designers}
              element={<DesignersComponent />}
            />
            <Route
              path={ROUTES.main.forum.tech}
              element={<TechnologiesComponent />}
            />
          </Route>
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
