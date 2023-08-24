import { useEffect, useRef, useState, ChangeEvent } from 'react';

import { drawPacMan } from '../../components/GameComponents/PacMan/PacMan';
import { drawMap } from '../../components/GameComponents/Map/Map';
import { getGameLevel } from './getGameLevel';
import styles from './styles.module.scss';

const GameField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellSize = 20;
  const [level, setLevel] = useState<number>(1);
  const [mapMatrix, setMapMatrix] = useState<number[][]>([]);
  const [matrixSize, setMatrixSize] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    getGameFieldMatrix(level);
  }, [level]);

  const getGameFieldMatrix = async (gameLevel: number) => {
    const res = await getGameLevel(gameLevel);
    const { matrix } = res;
    setMatrixSize([matrix[0].length, matrix.length]);
    setMapMatrix(matrix);
  };

  useEffect(() => {
    drawGame();
  }, [mapMatrix]);

  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, matrixSize[0] * cellSize, matrixSize[1] * cellSize);
    console.log('render rectangle');

    // // Draw border
    // ctx.strokeStyle = 'red';
    // ctx.lineWidth = 2;
    // ctx.strokeRect(0, 0, canvas.width, canvas.height);

    drawMap(ctx, mapMatrix, cellSize);

    // Draw Pac-Man
    drawPacMan(
      ctx,
      { x: cellSize, y: (matrixSize[1] / 2) * cellSize },
      cellSize,
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <LevelSelector setLevel={setLevel} />
        <canvas
          ref={canvasRef}
          width={matrixSize[0] * cellSize}
          height={matrixSize[1] * cellSize}
          style={{ border: '1px solid black' }}
        />
      </div>
    </div>
  );
};

export default GameField;

interface LevelSelectorProps {
  setLevel: (level: number) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ setLevel }) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  const handleLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSelectedLevel = parseInt(event.target.value, 10);
    setSelectedLevel(newSelectedLevel);
    setLevel(newSelectedLevel);
  };

  return (
    <div>
      <h2>Select a Level</h2>
      <label>
        <input
          type="radio"
          value={1}
          checked={selectedLevel === 1}
          onChange={handleLevelChange}
        />
        Level 1
      </label>
      <label>
        <input
          type="radio"
          value={2}
          checked={selectedLevel === 2}
          onChange={handleLevelChange}
        />
        Level 2
      </label>
      <p>Selected Level: {selectedLevel}</p>
    </div>
  );
};