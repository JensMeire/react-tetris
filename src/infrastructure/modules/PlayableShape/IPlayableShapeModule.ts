import {Grid} from "infrastructure/modules/Board/IBoardModule";
import IShape from "infrastructure/shape/IShape";

export type Position = [number, number];

export default interface IPlayableShapeModule {
  moveDown: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  rotateLeft: () => void;
  rotateRight: () => void;
  initializeNewShape: (shape: IShape, boardWidth: number) => void;
  getShape: () => IShape | undefined;
  getPosition: () => Position;
}