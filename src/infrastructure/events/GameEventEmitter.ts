import EventEmitter, {IEmitter} from "infrastructure/events/EventEmitter";
import {GameEvents} from "infrastructure/events/GameEvents";

export default class GameEventEmitter extends EventEmitter<GameEvents> {

}

export interface IGameEventEmitter extends IEmitter<GameEvents> {

}