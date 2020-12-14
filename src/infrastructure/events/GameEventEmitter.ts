import EventEmitter from "infrastructure/events/EventEmitter";
import {GameEvents} from "infrastructure/events/GameEvents";

export default class GameEventEmitter extends EventEmitter<GameEvents> {

}