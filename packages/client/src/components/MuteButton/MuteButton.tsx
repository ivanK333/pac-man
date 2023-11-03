import { FC } from 'react';

import classNames from 'classnames';

import styles from './styles.module.scss';
import useCheckLightTheme from '../../hooks/useCheckLightTheme';

interface ButtonProps {
  mute: boolean;
  onClick?: () => void;
}

const MuteButton: FC<ButtonProps> = (props) => {
  const { mute, onClick } = props;
  const { availableChangeThemeToDark } = useCheckLightTheme();
  return (
    <div>
      <button
        className={classNames([styles.muteButton, styles.container_dark], {
          [styles.container_light]: availableChangeThemeToDark,
        })}
        onClick={onClick}
      >
        {mute ? (
          <span
            role="img"
            aria-label="Unmute"
            className={classNames([styles.container_dark], {
              [styles.container_light]: availableChangeThemeToDark,
            })}
          >
            🔇
          </span>
        ) : (
          <span
            role="img"
            aria-label="Mute"
            className={classNames([styles.container_dark], {
              [styles.container_light]: availableChangeThemeToDark,
            })}
          >
            🔊
          </span>
        )}
      </button>
    </div>
  );
};

export default MuteButton;
