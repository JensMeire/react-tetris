import IShape from "infrastructure/shape/IShape";
import {Position} from "infrastructure/modules/PlayableShape/IPlayableShapeModule";
import {Grid} from "infrastructure/modules/Board/IBoardModule";

export default interface ICollisionDetector {
  canMoveDown: (shape: IShape, position: Position, grid: Grid) => boolean;
  canMoveLeft: (shape: IShape, position: Position, grid: Grid) => boolean;
  canMoveRight: (shape: IShape, position: Position, grid: Grid) => boolean;
}