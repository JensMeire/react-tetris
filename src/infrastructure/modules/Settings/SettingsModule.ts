import ISettingsModule, {IBoardSettings} from "infrastructure/modules/Settings/ISettingsModule";
import {GameActionKeyBinds} from "infrastructure/game/GameActions";
import {IGameEventEmitter} from "infrastructure/events/GameEventEmitter";
import GameEvents from "infrastructure/events/GameEvents";
import set = Reflect.set;

export default class SettingsModule implements ISettingsModule {
  private _keyBinds: GameActionKeyBinds;
  private _eventEmitter: IGameEventEmitter;
  private _boardSettings: IBoardSettings;

  constructor(eventEmitter: IGameEventEmitter, keyBinds: GameActionKeyBinds, boardSettings: IBoardSettings) {
    this._eventEmitter = eventEmitter;
    this._keyBinds = keyBinds;
    this._boardSettings = boardSettings;
  }

  getKeyBindings(): GameActionKeyBinds {
    return this._keyBinds;
  }

  setKeyBindings(keyBinds: GameActionKeyBinds): void {
    this._keyBinds = keyBinds;
    this._eventEmitter.emit(GameEvents.KeyBindsChanged, keyBinds);
  }

  subscribeKeyBindingChanged(cb: (keyBinds?: GameActionKeyBinds) => void): string {
    return this._eventEmitter.subscribe(GameEvents.KeyBindsChanged, cb);
  }

  unsubscribeKeyBindingsChanged(subscriptionId: string): void {
    this._eventEmitter.unsubscribe(GameEvents.KeyBindsChanged, subscriptionId);
  }

  getBoardSettings(): IBoardSettings {
    return this._boardSettings;
  }

  setBoardSettings(settings: IBoardSettings): void {
    this._boardSettings = settings;
  }
}