import IShape from "infrastructure/shape/IShape";

export type Color = string
export type Grid = Array<Array<Color>>

export default interface IBoardModule {
  getGrid: () => Grid;
  subscribeBoardChanged: (cb: (grid?: Grid) => void) => string;
  unsubscribeBoardChanged: (subscriptionId: string) => void;
  lockShape: () => void;
  moveDown: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  rotateLeft: () => void;
  rotateRight: () => void;
  setShape: (shape: IShape) => void;
}