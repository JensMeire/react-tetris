import {generateUniqueID} from "web-vitals/dist/lib/generateUniqueID";

type EventMap = Record<string, any>;
type EventKey<T extends EventMap> = string & keyof T;
type EventCallback<T> = (payload: T | undefined) => void;
type EventSubscriber<T> = {
  id: string;
  callback: EventCallback<T>;
}

export interface IEmitter<T extends EventMap> {
  subscribe<U extends EventKey<T>>(eventName: U, callback: EventCallback<T[U]>, subscriberId?: string | undefined): string;
  unsubscribe<U extends EventKey<T>>(eventName: U, subscriberId: string): void;
  emit<U extends EventKey<T>>(eventName: U, payload: T[U] | undefined): void;
}

export default class EventEmitter<T extends EventMap> implements IEmitter<T> {
  private _subscriptions: {
    [U in keyof T]?: EventSubscriber<T[U]>[];
  };

  constructor() {
    this._subscriptions = {};
  }

  emit<U extends EventKey<T>>(eventName: U, payload: T[U] | undefined = undefined): void {
    const subscriptions = this._subscriptions[eventName];
    if (!subscriptions) return;

    subscriptions.forEach(s => s.callback(payload));
  }

  subscribe<U extends EventKey<T>>(eventName: U, callback: EventCallback<T[U]>, subscriberId: string | undefined = undefined): string {
    if(!subscriberId)
      subscriberId = generateUniqueID();
    const subscriptions = this._subscriptions[eventName] ?? [];
    if (subscriptions.find(s => s.id === subscriberId))
      throw new Error(`Subscriber '${subscriberId}'  on event '${eventName}' already exists`);

    this._subscriptions[eventName] = [...subscriptions, {
      id: subscriberId,
      callback: callback
    } as EventSubscriber<T[U]>];

    return subscriberId;
  }

  unsubscribe<U extends EventKey<T>>(eventName: U, subscriberId: string): void {
    const subscriptions = this._subscriptions[eventName];
    if (!subscriptions || subscriptions.length === 0)
      return;

    this._subscriptions[eventName] = [...subscriptions.filter(s => s.id !== subscriberId)];
  }
}


