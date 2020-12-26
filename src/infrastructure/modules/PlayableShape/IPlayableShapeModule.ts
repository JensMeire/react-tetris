import {Grid} from "infrastructure/modules/Board/IBoardModule";

export type Position = [number, number];

export default interface IPlayableShapeModule {
  moveDown: (grid: Grid) => void;
  moveLeft: (grid: Grid) => void;
  moveRight: (grid: Grid) => void;
  rotateLeft: () => void;
  rotateRight: () => void;
}