import styles from './styles.module.scss';
import LeaderboardItem from './LeaderboardItem/LeaderboardItem';
import defaultImage from '../../../static/images/default-avatar.svg';
const Leaderboard = () => {
  const testLeaderboardData = [
    { image: defaultImage, index: 1, name: 'Test1', score: 9999, id: 1 },
    { image: defaultImage, index: 2, name: 'Test2', score: 8000, id: 2 },
    { image: defaultImage, index: 3, name: 'Test3', score: 7000, id: 3 },
    { image: defaultImage, index: 4, name: 'Test4', score: 6000, id: 4 },
    { image: defaultImage, index: 5, name: 'Test5', score: 5000, id: 5 },
    { image: defaultImage, index: 6, name: 'Test6', score: 4000, id: 6 },
    { image: defaultImage, index: 7, name: 'Test7', score: 3000, id: 7 },
  ];

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {testLeaderboardData.map((i) => (
          <LeaderboardItem
            image={i.image}
            index={i.index}
            name={i.name}
            score={i.score}
            key={i.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default Leaderboard;
