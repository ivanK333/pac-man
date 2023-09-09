enum MapElements {
  NONE = 0,
  WALL = 1,
  FOOD = 2,
}

export type MapProps = {
  level: number[][]; // можно потом поменять на просто номер уровня и сделать метод как взять
  blockSize: number;
  mapElements: MapElements;
};

export class Map {
  level: number[][];
  blockSize: number;

  constructor(props: MapProps) {
    this.level = props.level;
    this.blockSize = props.blockSize;
    // this.elements =
  }
}
