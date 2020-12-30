import {IGameEventEmitter} from "infrastructure/events/GameEventEmitter";
import IShape from "infrastructure/shape/IShape";
import IPlayableShapeModule, {Position} from "infrastructure/modules/PlayableShape/IPlayableShapeModule";

const PositionZero = [0, 0] as Position;

export default class PlayableShapeModule implements IPlayableShapeModule {
  _emitter: IGameEventEmitter;
  _shape: IShape | undefined;
  _position: Position;

  constructor(emitter: IGameEventEmitter) {
    this._emitter = emitter;
    this._shape = undefined;
    this._position = PositionZero;
  }

  moveDown(): void {
    const [x, y] = this._position;
    this._position = [x, y + 1];
  }

  moveLeft(): void {
    const [x, y] = this._position;
    if(x !== 0)
      this._position = [x - 1, y];
  }

  moveRight(): void {
    const [x, y] = this._position;
    this._position = [x + 1, y];
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