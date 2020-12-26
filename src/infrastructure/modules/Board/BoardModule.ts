import {IGameEventEmitter} from "infrastructure/events/GameEventEmitter";
import GameEvents from "infrastructure/events/GameEvents";
import IBoardModule, {Grid} from "infrastructure/modules/Board/IBoardModule";

const EmptyGrid = [] as Grid;

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