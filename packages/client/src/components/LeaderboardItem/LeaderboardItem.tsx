import { FC } from 'react';

import defaultImage from '../../assets/images/default-avatar.svg';
import styles from './styles.module.scss';

type TLeaderboardItemProps = {
  index: number;
  score: number;
  image: string;
  name: string;
};

const LeaderboardItem: FC<TLeaderboardItemProps> = ({
  index,
  name,
  image,
  score,
}) => {
  return (
    <li className={styles.container}>
      <h2 className={styles.index}>{index}</h2>
      <p className={styles.score}>{score}</p>
      <div className={styles.imageContainer}>
        {image === defaultImage ? (
          <img className={styles.imageDefault} src={image} alt="avatar" />
        ) : (
          <img className={styles.image} src={image} alt="avatar" />
        )}
      </div>

      <p className={styles.name}>{name}</p>
    </li>
  );
};

export default LeaderboardItem;
