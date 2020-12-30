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

  constructor(eventEmitter: IGameEventEmitter, boardModule: IBoardModule, playableShapeModule: IPlayableShapeModule, settingsModule: ISettingsModule, shapeQueue: IShapeQueueModule) {
    this._eventEmitter = eventEmitter;
    this._boardModule = boardModule;
    this._playableShapeModule = playableShapeModule;
    this._settingsModule = settingsModule;
    this._shapeQueue = shapeQueue;
    this.initializeBindings();
    this.registerEvents();
  }

  registerEvents(): void {
    this._settingsModule.subscribeKeyBindingChanged(this.updateBindingsOnKeyChange)
  }

  getActions(): GameActionFunctionBinds {
    return {
      [GameActions.MoveDown]: this._playableShapeModule.moveDown,
      [GameActions.MoveRight]: this._playableShapeModule.moveRight,
      [GameActions.MoveLeft]: this._playableShapeModule.moveLeft,
      [GameActions.RotateLeft]: this._playableShapeModule.rotateLeft,
      [GameActions.RotateRight]: this._playableShapeModule.rotateRight
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

  }

  tick(): void {
    if(!this._boardModule.moveDown(this._boardModule.getGrid())) {
      const shape = this._playableShapeModule.getShape();
      const position = this._playableShapeModule.getPosition();
      if(!shape) return;
      this._boardModule.lockShape(shape, position);
      //emit shape locked
      this._shapeQueue.shiftShapes();
      this._playableShapeModule.initializeNewShape(this._shapeQueue.getCurrentShape());
    }
  }
}











