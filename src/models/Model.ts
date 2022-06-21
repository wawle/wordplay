import { AxiosPromise, AxiosResponse } from 'axios';

interface ModalAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get(key: keyof T): T[keyof T];
}

interface Sync<T> {
  fetch: (id: number) => AxiosPromise<T>;
  save: (data: any) => AxiosPromise<T>;
}

interface Events {
  on: (eventName: string, callback: Function) => void;
  trigger: (eventName: string) => void;
}

export class Model<T> {
  constructor(
    public attrs: ModalAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attrs.get;

  set(update: T): void {
    this.attrs.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    // const id = this.get('id');
    // if (typeof id !== 'number') {
    //   throw new Error('User must have an id');
    // }
    // this.sync.fetch(id).then((response: AxiosResponse): void => {
    //   this.set(response.data);
    // });
  }

  save(): void {
    this.sync
      .save(this.attrs.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch((): void => {
        this.trigger('error');
      });
  }
}
