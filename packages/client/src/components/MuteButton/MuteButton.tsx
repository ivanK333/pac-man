import { FC } from 'react';

interface ButtonProps {
  mute: boolean;
  onClick?: () => void;
}

const MuteButton: FC<ButtonProps> = (props) => {
  const { mute, onClick } = props;
  return (
    <div>
      {mute ? (
        <button onClick={onClick}>
          <span role="img" aria-label="Unmute">
            🔇
          </span>
        </button>
      ) : (
        <button onClick={onClick}>
          <span role="img" aria-label="Mute">
            🔊
          </span>
        </button>
      )}
    </div>
  );
};

export default MuteButton;
