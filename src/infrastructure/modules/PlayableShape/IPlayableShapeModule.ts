import {Grid} from "infrastructure/modules/Board/IBoardModule";
import IShape from "infrastructure/shape/IShape";

export type Position = [number, number];

export default interface IPlayableShapeModule {
  moveDown: (grid: Grid) => boolean;
  moveLeft: (grid: Grid) => boolean;
  moveRight: (grid: Grid) => boolean;
  rotateLeft: () => void;
  rotateRight: () => void;
  initializeNewShape: (shape: IShape, boardWidth: number) => void;
  getShape: () => IShape | undefined;
  getPosition: () => Position;
}