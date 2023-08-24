import {
  Component,
  useEffect,
  useRef,
  useState,
  createRef,
  ChangeEvent,
} from 'react';

import { drawPacMan } from '../../components/GameComponents/PacMan/PacMan';
// import { drawPellet } from '../../components/GameComponents/Pellet/Pettet';
// import { drawWalls } from '../../components/GameComponents/Walls/Walls';
import { MapMatrix_001 } from '../../components/GameComponents/Layers/Layer_001';
// import { MapMatrix_test } from '../../components/GameComponents/Layers/Layer_test';
// import { performRandomWalk } from '../../components/GameComponents/Layers/Generator/generator';
// import { readCSVFile } from '../../components/GameComponents/Layers/Generator/generateFromCsv';
import { drawMap } from '../../components/GameComponents/Map/Map';
import { getGameLevel } from './getGameLevel';
import styles from './styles.module.scss';

const GameField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellSize = 20;
  const [level, setLevel] = useState<number>(1);
  const [mapMatrix, setMapMatrix] = useState<number[][]>([]);
  const [width, setWidth] = useState<number>(31 * cellSize);
  const [height, setHeight] = useState<number>(31 * cellSize);

  useEffect(() => {
    getGameFieldMatrix(level);
  }, [level]);

  const getGameFieldMatrix = async (gameLevel: number) => {
    const fetchedMapMatrix = await getGameLevel(gameLevel);
    setMapMatrix(fetchedMapMatrix.matrix);
  };

  useEffect(() => {
    drawGame();
  }, [mapMatrix, level]);

  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // // Draw border
    // ctx.strokeStyle = 'red';
    // ctx.lineWidth = 2;
    // ctx.strokeRect(0, 0, canvas.width, canvas.height);

    drawMap(ctx, mapMatrix, cellSize);

    // Draw Pac-Man
    drawPacMan(ctx, { x: 5 * cellSize, y: 5 * cellSize }, cellSize * 0.6);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <LevelSelector setLevel={setLevel} />
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
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
