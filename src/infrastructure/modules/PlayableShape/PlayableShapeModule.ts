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
    if (!this._shape) return false;
    return this._collisionDetector.canMoveDown(this._shape, this._position, grid);
  }

  moveDown(grid: Grid): boolean {
    if (!this._shape || !this.canMoveDown(grid))
      return false;

    const [x, y] = this._position;
    if (y === grid.length)
      return false;

    this._position = [x, y + 1];
    return true;
  }

  canMoveLeft(grid: Grid): boolean {
    if (!this._shape) return false;
    return this._collisionDetector.canMoveLeft(this._shape, this._position, grid);
  }

  moveLeft(grid: Grid): boolean {
    if (!this._shape || !this.canMoveLeft(grid))
      return false;

    const [x, y] = this._position;
    if (x === 0)
      return false;

    this._position = [x - 1, y];
    return true;
  }

  canMoveRight(grid: Grid): boolean {
    if (!this._shape) return false;
    return this._collisionDetector.canMoveRight(this._shape, this._position, grid);
  }

  moveRight(grid: Grid): boolean {
    if (!this._shape || !this.canMoveRight(grid))
      return false;

    const [x, y] = this._position;
    if (x === grid[0].length)
      return false

    this._position = [x - 1, y];
    return true;
  }

  rotateLeft(): void {
    this._shape?.rotateLeft();
  }

  rotateRight(): void {
    this._shape?.rotateRight();
  }

  initializeNewShape(shape: IShape, boardWidth: number): void {
    const [width, height] = shape.getSize();
    const x = Math.floor((boardWidth - width) / 2);
    const y = height - 1
    this._position = [x, y];
    this._shape = shape;
  }

  getShape(): IShape | undefined {
    return this._shape;
  }

  getPosition(): Position {
    return this._position;
  }
}