import { FC } from 'react';

import classNames from 'classnames';

import styles from './styles.module.scss';
import AvatarImage from '../../../../components/AvatarImage/AvatarImage';
import { useReadLocalStorage } from '../../../../hooks/useLocalStorage';

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
  const isLightTheme = useReadLocalStorage('isLightTheme');
  const availableChangeThemeToDark = isLightTheme === 'true';

  return (
    <li className={styles.container}>
      <h2
        className={classNames([styles.index], {
          [styles.index_light]: availableChangeThemeToDark,
        })}
      >
        {index}
      </h2>
      <p className={styles.score}>{score}</p>
      <AvatarImage image={image} />
      <p className={styles.name}>{name}</p>
    </li>
  );
};

export default LeaderboardItem;
