import { useState, useLayoutEffect } from 'react';

import styles from './styles.module.scss';
import LeaderboardItem from './components/LeaderboardItem/LeaderboardItem';
import { leaderboardController } from '../../controllers/LeaderboardController';

type leaderboardData = Record<
  string,
  {
    avatar: string;
    index: number;
    name: string;
    score: number;
    id: number;
  }
>[];

const Leaderboard = () => {
  const [data, setData] = useState<leaderboardData>([]);

  const { getTeamLeaderboard } = leaderboardController();

  const getLeaderboardData = async () => {
    const response = await getTeamLeaderboard();

    if (response?.data) {
      response.data.forEach(
        (item: Record<string, Record<string, string | number>>, i: number) => {
          item.data.id = i + 1;
          item.data.index = i + 1;
          item.data.avatar = `https://ya-praktikum.tech/api/v2/resources${item.data.avatar}`;
        },
      );

      setData(response.data);
    }
  };

  useLayoutEffect(() => {
    getLeaderboardData();
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {data.map((i) => (
          <LeaderboardItem
            image={i.data.avatar}
            index={i.data.index}
            name={i.data.name}
            score={i.data.score}
            key={i.data.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
