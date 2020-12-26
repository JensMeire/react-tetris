import {IGameEventEmitter} from "infrastructure/events/GameEventEmitter";
import IShape from "infrastructure/shape/IShape";
import IPlayableShapeModule, {Position} from "infrastructure/modules/PlayableShape/IPlayableShapeModule";
import ICollisionDetector from "infrastructure/modules/CollisionDetector/ICollisionDetector";
import {Grid} from "infrastructure/modules/Board/IBoardModule";

const PositionZero = [0, 0] as Position;

export default class PlayableShapeModule implements IPlayableShapeModule {
  _emitter: IGameEventEmitter;
  _collisionDetector: ICollisionDetector;
  _shape: IShape | undefined;
  _position: Position;

  constructor(emitter: IGameEventEmitter, collisionDetector: ICollisionDetector) {
    this._emitter = emitter;
    this._collisionDetector = collisionDetector;
    this._shape = undefined;
    this._position = PositionZero;
  }

  canMoveDown(grid: Grid): boolean {
    return false;
  }

  moveDown(grid: Grid): void {
    if (!this._shape)
      return;

    const [x, y] = this._position;
    if (y !== grid.length)
      this._position = [x, y + 1];
  }

  canMoveLeft(grid: Grid): boolean {
    return false;
  }

  moveLeft(grid: Grid): void {
    if (!this._shape)
      return;

    const [x, y] = this._position;
    if (x !== 0)
      this._position = [x - 1, y];
  }

  canMoveRight(grid: Grid): boolean {
    return false;
  }

  moveRight(grid: Grid): void {
    if (!this._shape)
      return;

    const [x, y] = this._position;
    if (x !== grid[0].length)
      this._position = [x - 1, y];
  }

  rotateLeft(): void {
    this._shape?.rotateLeft();
  }

  rotateRight(): void {
    this._shape?.rotateRight();
  }
}