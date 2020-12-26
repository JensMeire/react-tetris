export enum GameActions {
  MoveDown,
  MoveLeft,
  MoveRight,
  RotateLeft,
  RotateRight
}

export type GameActionFunctionBinds = Record<GameActions, Function>;
export type GameActionKeyBinds = Record<GameActions, string>;

