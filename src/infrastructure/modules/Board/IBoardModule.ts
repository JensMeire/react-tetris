import IShape from "infrastructure/shape/IShape";
import {Position} from "infrastructure/modules/PlayableShape/IPlayableShapeModule";

export type Color = string
export type Grid = Array<Array<Color>>

export default interface IBoardModule {
  getGrid: () => Grid;
  subscribeBoardChanged: (cb: (grid?: Grid) => void) => string;
  unsubscribeBoardChanged: (subscriptionId: string) => void;
  lockShape: (shape: IShape, position: Position) => void
}