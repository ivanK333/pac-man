import { Direction, MapElements } from './config';

type TRestrictions = {
  up: boolean;
  right: boolean;
  down: boolean;
  left: boolean;
  stop: false;
};

interface ICanvasProps {
  updateScore: (value: number) => void;
  updateLives: (value: number) => void;
  restart: number;
}

type TGameProps = {
  time: number | null;
  setTime: React.Dispatch<React.SetStateAction<number | null>>;
  map: number[][];
  setMap: React.Dispatch<React.SetStateAction<number[][]>>;
  updateScore: (value: number) => void;
  updateLives: (value: number) => void;
  restart: number;
  dimentions: number[];
};

type TCharacterProps = {
  size: number;
  speed: number;
  startPosition: number[];
  startDirection: Direction;
};

type TGhostsProps = {
  size: number;
  speed: number;
  startPosition: number[];
  startDirection: Direction;
  defaultTargetBlock: number[];
};

type TMapProps = {
  level: number[][]; // можно потом поменять на просто номер уровня и сделать метод как взять
  blockSize: number;
  mapElements: MapElements;
};

export type {
  TRestrictions,
  ICanvasProps,
  TGameProps,
  TCharacterProps,
  TMapProps,
  TGhostsProps,
};
