import { Component, createRef } from 'react';

import { drawPacMan } from '../../components/GameComponents/PacMan/PacMan';
// import { drawPellet } from '../../components/GameComponents/Pellet/Pettet';
// import { drawWalls } from '../../components/GameComponents/Walls/Walls';
import { MapMatrix_001 } from '../../components/GameComponents/Layers/Layer_001';
// import { MapMatrix_test } from '../../components/GameComponents/Layers/Layer_test';
// import { performRandomWalk } from '../../components/GameComponents/Layers/Generator/generator';
// import { readCSVFile } from '../../components/GameComponents/Layers/Generator/generateFromCsv';
import { drawMap } from '../../components/GameComponents/Map/Map';
import styles from './styles.module.scss';

class GameField extends Component {
  private canvasRef = createRef<HTMLCanvasElement>();
  private mapMatrix = MapMatrix_001;
  private cellSize = 20;
  private width = this.mapMatrix[0].length * this.cellSize;
  private height = this.mapMatrix.length * this.cellSize;

  componentDidMount() {
    this.drawGame();
  }

  drawGame = () => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Create the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawMap(ctx, this.mapMatrix, this.cellSize);

      // Draw Pac-Man
      drawPacMan(
        ctx,
        { x: 5 * this.cellSize, y: 5 * this.cellSize },
        this.cellSize * 0.6,
      );
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <canvas
            ref={this.canvasRef}
            width={this.width}
            height={this.height}
            style={{ border: '1px solid black' }}
          />
        </div>
      </div>
    );
  }
}

export default GameField;
