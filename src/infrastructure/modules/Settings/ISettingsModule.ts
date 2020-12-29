import {GameActionKeyBinds} from "infrastructure/game/GameActions";

export interface IBoardSettings {
  width: number;
  height: number;
}

export default interface ISettingsModule {
  getKeyBindings: () => GameActionKeyBinds;
  setKeyBindings: (keyBinds: GameActionKeyBinds) => void;
  getBoardSettings: () => IBoardSettings;
  setBoardSettings: (settings: IBoardSettings) => void;
  subscribeKeyBindingChanged: (cb: (keyBinds?: GameActionKeyBinds) => void) => string;
  unsubscribeKeyBindingsChanged: (subscriptionId: string) => void;
}