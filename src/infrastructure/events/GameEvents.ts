import {GameActionKeyBinds} from "infrastructure/game/GameActions";
import {Grid} from "infrastructure/modules/Board/IBoardModule";
import IShape from "infrastructure/shape/IShape";

enum GameEventType {
  Pause = "PAUSE_GAME",
  Start = "START_GAME",
  GameOver = "GAME_OVER",
  BoardChanged = "BOARD_CHANGED",
  KeyBindsChanged = "KEY_BINDS_CHANGED",
  ShapeQueueChanged = "SHAPE_QUEUE_CHANGED"
}

export interface GameEvents {
  [GameEventType.Start]: undefined,
  [GameEventType.Pause]: undefined,
  [GameEventType.GameOver]: undefined,
  [GameEventType.BoardChanged]: Grid,
  [GameEventType.KeyBindsChanged]: GameActionKeyBinds,
  [GameEventType.ShapeQueueChanged]: [IShape, IShape]
}

export default GameEventType;