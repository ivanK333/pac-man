import { FC } from 'react';

import styles from './styles.module.scss';
import AvatarImage from '../../../../components/AvatarImage/AvatarImage';
import { RESOURCES_URL } from '../../../../constants/api';

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
      <AvatarImage image={`${RESOURCES_URL}${image}`} />
      <p className={styles.name}>{name}</p>
    </li>
  );
};

export default LeaderboardItem;
