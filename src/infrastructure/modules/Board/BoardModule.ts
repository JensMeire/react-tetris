import {IGameEventEmitter} from "infrastructure/events/GameEventEmitter";
import GameEvents from "infrastructure/events/GameEvents";
import IBoardModule, {Grid} from "infrastructure/modules/Board/IBoardModule";
import IShape from "infrastructure/shape/IShape";
import IPlayableShapeModule, {Position} from "infrastructure/modules/PlayableShape/IPlayableShapeModule";
import ICollisionDetector from "infrastructure/modules/CollisionDetector/ICollisionDetector";
import {IBoardSettings} from "infrastructure/modules/Settings/ISettingsModule";

const EmptyGrid = [] as Grid;

export class BoardModule implements IBoardModule {
  private _board: Grid;
  private _eventEmitter: IGameEventEmitter;
  private _shapeModule: IPlayableShapeModule;
  private _collisionDetector: ICollisionDetector;
  private _settings!: IBoardSettings;
  private _canMoveDown: boolean;

  constructor(emitter: IGameEventEmitter, shapeModule: IPlayableShapeModule, collisionDetector: ICollisionDetector) {
    this._shapeModule = shapeModule;
    this._collisionDetector = collisionDetector;
    this._board = EmptyGrid;
    this._eventEmitter = emitter;
    this._canMoveDown = false;
  }

  registerListeners(): void {
    this._eventEmitter.subscribe(GameEvents.BoardSettingsChanged, this.setSettings);
  }

  setSettings(settings: IBoardSettings | undefined) {
    if(!settings)
      return;

    this._settings = settings;
    //Init Grid
  }

  subscribeBoardChanged(cb: (grid?: Grid) => void): string {
    return this._eventEmitter.subscribe(GameEvents.BoardChanged, cb);
  }

  unsubscribeBoardChanged(subscriptionId: string): void {
    this._eventEmitter.unsubscribe(GameEvents.BoardChanged, subscriptionId);
  }

  canMoveDown(): boolean {
    const shape = this._shapeModule.getShape();
    if (!shape)
      return false;

    const canMoveDown = this._collisionDetector.canMoveDown(shape, this._shapeModule.getPosition(), this._board);
    this._canMoveDown = canMoveDown;
    return canMoveDown;
  }

  canMoveLeft(): boolean {
    const shape = this._shapeModule.getShape();
    if (!shape)
      return false;

    return this._collisionDetector.canMoveLeft(shape, this._shapeModule.getPosition(), this._board);
  }

  canMoveRight(): boolean {
    const shape = this._shapeModule.getShape();
    if (!shape)
      return false;

    return this._collisionDetector.canMoveRight(shape, this._shapeModule.getPosition(), this._board);
  }

  getGrid(): Grid {
    return this._board;
  }

  lockShape(): void {
    const [xStart, yStart] = this._shapeModule.getPosition();
    const shape = this._shapeModule.getShape();
    if(!shape)
      return;

    const [width, height] = shape.getSize();
    const shapeGrid = shape.getGrid();
    for(let y = yStart, j = height - 1; j === 0; j--, y--) {
      for(let x =  xStart, i = 0; i < width; i++, x++) {
        if(shapeGrid[j][i])
          this._board[y][x] = shape.getColor();
      }
    }
  }

  moveDown(): void {
    if(this.canMoveDown()) {
      this._shapeModule?.moveDown();
      this._canMoveDown = false;
    }
  }

  moveLeft(): void {
    if(this.canMoveLeft())
      this._shapeModule?.moveLeft();
  }

  moveRight(): void {
    if(this.canMoveRight())
      this._shapeModule?.moveRight();
  }

  rotateLeft(): void {
    this._shapeModule?.rotateLeft();
  }

  rotateRight(): void {
    this._shapeModule?.rotateRight();
  }

  setShape(shape: IShape): void {
    this._shapeModule.initializeNewShape(shape, this._board[0].length)
  }
}