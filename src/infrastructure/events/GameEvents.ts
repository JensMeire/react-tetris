enum GameEventType {
  Pause = "PAUSE_GAME",
  Start = "START_GAME",
  GameOver = "GAME_OVER"
}

export interface GameEvents {
  [GameEventType.Start]: undefined,
  [GameEventType.Pause]: undefined,
  [GameEventType.GameOver]: undefined
}

export default GameEventType;