import { AxiosPromise, AxiosResponse } from "axios";

interface ModalAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get(key: keyof T): T[keyof T];
}

interface Sync<T> {
  fetch: () => AxiosPromise<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  save: (data: any) => AxiosPromise<T>;
}

interface Events {
  // eslint-disable-next-line @typescript-eslint/ban-types
  on: (eventName: string, callback: Function) => void;
  trigger: (eventName: string) => void;
}

export class Model<T> {
  constructor(
    private attrs: ModalAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attrs.get;

  set(update: T): void {
    this.attrs.set(update);
    this.events.trigger("change");
  }

  setProp(updateData: T[keyof T]): void {
    Object.assign(this.attrs.getAll(), updateData);
    this.events.trigger("change");
  }

  fetch(): void {
    this.sync.fetch().then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(key: keyof T): void {
    this.sync
      .save(this.attrs.get(key))
      .then((): void => {
        this.trigger("save");
      })
      .catch((): void => {
        this.trigger("error");
      });
  }
}
