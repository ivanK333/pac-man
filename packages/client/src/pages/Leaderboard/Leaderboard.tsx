import { useState, useLayoutEffect } from 'react';

import styles from './styles.module.scss';
import LeaderboardItem from './components/LeaderboardItem/LeaderboardItem';
import { leaderboardController } from '../../controllers/LeaderboardController';

export interface IGetLeaderboardData {
  data: {
    avatar: string;
    index: number;
    name: string;
    score: number;
    id: number;
  };
}

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<IGetLeaderboardData[]>(
    [],
  );

  const { getTeamLeaderboard } = leaderboardController();

  const getLeaderboardData = async () => {
    const response = await getTeamLeaderboard();

    if (response?.data) {
      setLeaderboardData(response.data);
    }
  };

  useLayoutEffect(() => {
    getLeaderboardData();
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {leaderboardData.map((item) => (
          <LeaderboardItem
            image={item.data.avatar}
            index={item.data.index}
            name={item.data.name}
            score={item.data.score}
            key={item.data.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
