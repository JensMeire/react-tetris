import IShape from "infrastructure/shape/IShape";
import LineShape from "infrastructure/shape/LineShape";
import LShape from "infrastructure/shape/LShape";
import ReversedLShape from "infrastructure/shape/ReversedLShape";
import SquareShape from "infrastructure/shape/SquareShape";
import TShape from "infrastructure/shape/TShape";
import ZShape from "infrastructure/shape/ZShape";
import ReversedZShape from "infrastructure/shape/ReversedZShape";
import IShapeQueueModule from "infrastructure/modules/ShapeQueue/IShapeQueueModule";
import {IGameEventEmitter} from "infrastructure/events/GameEventEmitter";
import GameEvents from "infrastructure/events/GameEvents";

export default class ShapeQueueModule implements IShapeQueueModule{
  private _currentShape: IShape;
  private _nextShape: IShape;
  private _eventEmitter: IGameEventEmitter;

  constructor(eventEmitter: IGameEventEmitter) {
    this._eventEmitter = eventEmitter;
    this._currentShape = this.getRandomShape();
    this._nextShape = this.getRandomShape();
  }

  getCurrentShape(): IShape {
    return this._currentShape;
  }

  getNextShape(): IShape {
    return this._nextShape;
  }

  shiftShapes(): void {
    this._currentShape = this._nextShape;
    this._nextShape = this.getRandomShape();
    this._eventEmitter.emit(GameEvents.ShapeQueueChanged, [this._currentShape, this._nextShape]);
  }

  availableShapes: Array<() => IShape> = [
    () => new LineShape(),
    () => new LShape(),
    () => new ReversedLShape(),
    () => new SquareShape(),
    () => new TShape(),
    () => new ZShape(),
    () => new ReversedZShape()
  ];

  getRandomShape = (): IShape => {
    const random = Math.floor(Math.random() * this.availableShapes.length);
    return this.availableShapes[random]();
  };

  subscribeQueueChanged(cb: (shapes?: [IShape, IShape]) => void): string {
    return this._eventEmitter.subscribe(GameEvents.ShapeQueueChanged, cb);
  }

  unsubscribeQueueChanged(subscriptionId: string): void {
    return this._eventEmitter.unsubscribe(GameEvents.ShapeQueueChanged, subscriptionId);
  }
}