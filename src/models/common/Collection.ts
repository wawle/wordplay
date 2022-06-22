import { Events } from "./Events";

export class Collection<T, K> {
  events: Events = new Events();

  constructor(public models: T[]) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }
}
