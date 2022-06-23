import { Events } from "./Events";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
