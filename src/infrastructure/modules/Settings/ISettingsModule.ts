import {GameActionKeyBinds} from "infrastructure/game/GameActions";

export default interface ISettingsModule {
  getKeyBindings: () => GameActionKeyBinds;
}