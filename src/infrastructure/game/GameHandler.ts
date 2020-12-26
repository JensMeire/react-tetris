import IPlayableShapeModule from "infrastructure/modules/PlayableShape/IPlayableShapeModule";
import IBoardModule from "infrastructure/modules/Board/IBoardModule";
import {GameActionFunctionBinds, GameActions} from "infrastructure/game/GameActions";
import hotkeys from "hotkeys-js";
import ISettingsModule from "infrastructure/modules/Settings/ISettingsModule";

export default class GameHandler {
  private _boardModule: IBoardModule;
  private _playableShapeModule: IPlayableShapeModule;
  private _settingsModule: ISettingsModule;

  constructor(boardModule: IBoardModule, playableShapeModule: IPlayableShapeModule, settingsModule: ISettingsModule) {
    this._boardModule = boardModule;
    this._playableShapeModule = playableShapeModule;
    this._settingsModule = settingsModule;
    this.initializeBindings();
  }

  getActions(): GameActionFunctionBinds {
    return {
      [GameActions.MoveDown]: this._playableShapeModule.moveDown,
      [GameActions.MoveRight]: this._playableShapeModule.moveRight,
      [GameActions.MoveLeft]: this._playableShapeModule.moveLeft,
      [GameActions.RotateLeft] : this._playableShapeModule.rotateLeft,
      [GameActions.RotateRight]: this._playableShapeModule.rotateRight
    }
  }

  initializeBindings(): void {
    const keyBindings = this._settingsModule.getKeyBindings();
    const actions = this.getActions();
    if(!keyBindings) throw new Error("No keybindings found");

    for(const objectKey in actions) {
      const gameAction = GameActions[objectKey as keyof typeof GameActions]

      const key = keyBindings[gameAction];
      if(!key) continue;

      const action = actions[gameAction];
      if(!action) continue;

      hotkeys(key, "game", () => action());
    }
  }
}











