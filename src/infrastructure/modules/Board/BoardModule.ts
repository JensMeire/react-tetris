import {IGameEventEmitter} from "infrastructure/events/GameEventEmitter";
import GameEvents from "infrastructure/events/GameEvents";
import IBoardModule, {Grid} from "infrastructure/modules/Board/IBoardModule";
import IShape from "infrastructure/shape/IShape";
import {Position} from "infrastructure/modules/PlayableShape/IPlayableShapeModule";

const EmptyGrid = [] as Grid;

export class BoardModule implements IBoardModule {
  private _board: Grid;
  private _eventEmitter: IGameEventEmitter;

  constructor(emitter: IGameEventEmitter) {
    this._board = EmptyGrid;
    this._eventEmitter = emitter;
  }

  subscribeBoardChanged(cb: (grid?: Grid) => void): string {
    return this._eventEmitter.subscribe(GameEvents.BoardChanged, cb);
  }

  unsubscribeBoardChanged(subscriptionId: string): void {
    this._eventEmitter.unsubscribe(GameEvents.BoardChanged, subscriptionId);
  }

  getGrid(): Grid {
    return this._board;
  }

  lockShape(shape: IShape, position: Position): void {
    const [xStart, yStart] = position;
    const [width, height] = shape.getSize();
    const shapeGrid = shape.getGrid();
    for(let y = yStart, j = height - 1; j === 0; j--, y--) {
      for(let x =  xStart, i = 0; i < width; i++, x++) {
        if(shapeGrid[j][i])
          this._board[y][x] = shape.getColor();
      }
    }
  }
}