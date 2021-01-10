import IPlayableShapeModule from "infrastructure/modules/PlayableShape/IPlayableShapeModule";
import IBoardModule from "infrastructure/modules/Board/IBoardModule";
import {GameActionFunctionBinds, GameActions} from "infrastructure/game/GameActions";
import hotkeys from "hotkeys-js";
import ISettingsModule from "infrastructure/modules/Settings/ISettingsModule";
import {IGameEventEmitter} from "infrastructure/events/GameEventEmitter";
import IShapeQueueModule from "infrastructure/modules/ShapeQueue/IShapeQueueModule";

export default class GameHandler {
  private _boardModule: IBoardModule;
  private _playableShapeModule: IPlayableShapeModule;
  private _settingsModule: ISettingsModule;
  private _eventEmitter: IGameEventEmitter;
  private _shapeQueue: IShapeQueueModule;
  private _gameIntervalId!: NodeJS.Timeout;
  private _isPaused: boolean;

  constructor(eventEmitter: IGameEventEmitter, boardModule: IBoardModule, playableShapeModule: IPlayableShapeModule, settingsModule: ISettingsModule, shapeQueue: IShapeQueueModule) {
    this._eventEmitter = eventEmitter;
    this._boardModule = boardModule;
    this._playableShapeModule = playableShapeModule;
    this._settingsModule = settingsModule;
    this._shapeQueue = shapeQueue;
    this._isPaused = false;
    this.initializeBindings();
    this.registerEvents();
  }

  registerEvents(): void {
    this._settingsModule.subscribeKeyBindingChanged(this.updateBindingsOnKeyChange)
  }

  performAction(cb: Function): void {
    if(!this._isPaused)
      cb();
  }

  getActions(): GameActionFunctionBinds {
    return {
      [GameActions.MoveDown]: () => this.performAction(this._playableShapeModule.moveDown),
      [GameActions.MoveRight]: () => this.performAction(this._playableShapeModule.moveRight),
      [GameActions.MoveLeft]: () => this.performAction(this._playableShapeModule.moveLeft),
      [GameActions.RotateLeft]: () => this.performAction(this._playableShapeModule.rotateLeft),
      [GameActions.RotateRight]: () => this.performAction(this._playableShapeModule.rotateRight)
    }
  }

  initializeBindings(): void {
    const keyBindings = this._settingsModule.getKeyBindings();
    const actions = this.getActions();
    if (!keyBindings) throw new Error("No keybindings found");

    for (const objectKey in actions) {
      const gameAction = GameActions[objectKey as keyof typeof GameActions]

      const key = keyBindings[gameAction];
      if (!key) continue;

      const action = actions[gameAction];
      if (!action) continue;

      hotkeys(key, "game", () => action());
    }
  }

  updateBindingsOnKeyChange(): void {
    hotkeys.deleteScope("game");
    this.initializeBindings();
  }

  startGame(): void {
    this._gameIntervalId = setInterval(this.tick, 10000)
  }

  pauseGame(): void {
    this._isPaused = true;
  }

  unPauseGame(): void {
    this._isPaused = false;
  }

  endGame(): void {
    if(this._gameIntervalId)
      return;

    clearInterval(this._gameIntervalId);
  }

  tick(): void {
    if(this._isPaused)
      return;

    if(!this._boardModule.canMoveDown()) {
      this._boardModule.lockShape();
      this._shapeQueue.shiftShapes();
      this._boardModule.setShape(this._shapeQueue.getCurrentShape());
      return;
    }

    this._boardModule.moveDown();
  }
}











