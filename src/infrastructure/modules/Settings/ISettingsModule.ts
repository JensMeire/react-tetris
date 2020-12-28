import {GameActionKeyBinds} from "infrastructure/game/GameActions";

export default interface ISettingsModule {
  getKeyBindings: () => GameActionKeyBinds;
  setKeyBindings: (keyBinds: GameActionKeyBinds) => void;
  subscribeKeyBindingChanged: (cb: (keyBinds?: GameActionKeyBinds) => void) => string;
  unsubscribeKeyBindingsChanged: (subscriptionId: string) => void;
}