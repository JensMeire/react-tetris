import {Color} from "infrastructure/game/GameHandler";

export type Grid = Array<Array<Color>>

export default interface IBoardModule {
  subscribeBoardChanged: (cb: () => Grid) => string;
  unsubscribeBoardChanged: (subscriptionId: string) => void;
}