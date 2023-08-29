import { useCallback, useEffect, useState } from 'react';

import LoaderGame from '../LoaderGame/LoaderGame';
import GameOver from '../GameOver/GameOver';
import StartGame from '../StartGame/StartGame';
const Game = () => {
  const [loader, setLoader] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);

  const restartGame = useCallback(() => {
    setLoader(true);
    // заглушка для отображения loader
    fakeLoader();
  }, []);

  const startGame = useCallback(() => {
    setStart(true);
  }, []);

  // заглушка для отображения loader
  const fakeLoader = useCallback(() => {
    setTimeout(() => {
      setLoader(false);
    }, 5000);
  }, []);

  // заглушка для отображения loader
  useEffect(() => {
    fakeLoader();
  }, []);

  return (
    <>
      {!start ? <StartGame startGame={startGame} /> : null}

      {loader && start ? (
        <LoaderGame />
      ) : (
        <GameOver restartGame={restartGame} />
      )}
    </>
  );
};
export default Game;
