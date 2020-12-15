import {IGameEventEmitter} from "infrastructure/events/GameEventEmitter";
import GameEvents from "infrastructure/events/GameEvents";
export type Color = string | undefined
export type Grid = Array<Array<Color>>
export type Position = [number, number];
const EmptyGrid = [] as Grid;
const PositionZero = [0, 0] as Position;

export default class GameHandler {

}

interface IBoardModule {
  subscribeBoardChanged: (cb: () => Grid) => string;
  unsubscribeBoardChanged: (subscriptionId: string) => void;
}

export class BoardModule implements IBoardModule{
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