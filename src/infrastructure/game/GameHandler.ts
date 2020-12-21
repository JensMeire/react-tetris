import {IGameEventEmitter} from "infrastructure/events/GameEventEmitter";
import GameEvents from "infrastructure/events/GameEvents";
import IShape from "infrastructure/shape/IShape";

export type Color = string | undefined
export type Grid = Array<Array<Color>>
export type Position = [number, number];
const EmptyGrid = [] as Grid;
const PositionZero = [0, 0] as Position;

export default class GameHandler {
  _boardModule: IBoardModule;
  _playableShapeModule: IPlayableShapeModule;

  constructor(boardModule: IBoardModule, playableShapeModule: IPlayableShapeModule) {
    this._boardModule = boardModule;
    this._playableShapeModule = playableShapeModule;
  }
}

export interface ICollisionDetector {
  canMoveDown: (shape: IShape, position: Position, grid: Grid) => boolean;
  canMoveLeft: (shape: IShape, position: Position, grid: Grid) => boolean;
  canMoveRight: (shape: IShape, position: Position, grid: Grid) => boolean;
}

export class CollisionDetector implements ICollisionDetector {
  canMoveDown(shape: IShape, position: Position, grid: Grid): boolean {
    if (!shape)
      return false;

    const [width, height] = shape.getSize();
    const [currentX, currentY] = position;
    const rowCount = grid[0].length;

    if (currentY === rowCount - 1)
      return false;

    const checkY = currentY + 1;
    const shapeGrid = shape.getGrid();

    for (let x = currentX, i = 0; i < width; x++, i++) {
      for (let y = height - 1, j = 0; y >= 0; y--, j++)
        if (grid[checkY - j][x] && shapeGrid[y][i])
          return false;
    }

    return true;
  }

  canMoveLeft(shape: IShape, position: Position, grid: Grid): boolean {
    if (!shape)
      return false;

    const [width, height] = shape.getSize();
    const [currentX, currentY] = position;

    if (currentX === 0) return false;

    const endY = currentY;
    const checkX = currentX - 1;
    const shapeGrid = shape.getGrid();

    for (let y = endY, i = height - 1; i >= 0; y--, i--) {
      for (let x = 0; x < width; x++)
        if (grid[y][checkX + x] && shapeGrid[i][x])
          return false;
    }

    return true;
  }

  canMoveRight(shape: IShape, position: Position, grid: Grid): boolean {
    if (!shape)
      return false;

    const [width, height] = shape.getSize();
    const [currentX, currentY] = position;
    const columnCount = grid.length;

    if (currentX === (columnCount - width))
      return false;

    const endY = currentY;
    const checkX = currentX + width;
    const shapeGrid = shape.getGrid();
    for (let y = endY, i = height - 1; i >= 0; y--, i--) {
      for (let x = width - 1, j = 0; x >= 0; x--, j++)
        if (grid[y][checkX - j] && shapeGrid[i][x])
          return false;
    }
    return true;
  }

}

export interface IPlayableShapeModule {
  moveDown: (grid: Grid) => void;
  moveLeft: (grid: Grid) => void;
  moveRight: (grid: Grid) => void;
  rotateLeft: () => void;
  rotateRight: () => void;
}

export class PlayableShapeModule implements IPlayableShapeModule {
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

interface IBoardModule {
  subscribeBoardChanged: (cb: () => Grid) => string;
  unsubscribeBoardChanged: (subscriptionId: string) => void;
}

export class BoardModule implements IBoardModule {
  private _board: Grid;
  private _eventEmitter: IGameEventEmitter;

  constructor(emitter: IGameEventEmitter) {
    this._board = EmptyGrid;
    this._eventEmitter = emitter;
  }

  subscribeBoardChanged(cb: () => Grid): string {
    return this._eventEmitter.subscribe(GameEvents.BoardChanged, cb);
  }

  unsubscribeBoardChanged(subscriptionId: string): void {
    this._eventEmitter.unsubscribe(GameEvents.BoardChanged, subscriptionId);
  }
}