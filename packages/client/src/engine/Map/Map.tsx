import { TMapProps } from '../types';
export class Map {
  level: number[][];
  blockSize: number;

  constructor(props: TMapProps) {
    this.level = props.level;
    this.blockSize = props.blockSize;
  }
}
