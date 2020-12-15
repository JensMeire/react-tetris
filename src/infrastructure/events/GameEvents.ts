import {Grid} from "infrastructure/game/GameHandler";

enum GameEventType {
  Pause = "PAUSE_GAME",
  Start = "START_GAME",
  GameOver = "GAME_OVER",
  BoardChanged = "BOARD_CHANGED"
}

export interface GameEvents {
  [GameEventType.Start]: undefined,
  [GameEventType.Pause]: undefined,
  [GameEventType.GameOver]: undefined,
  [GameEventType.BoardChanged]: Grid
}

export default GameEventType;