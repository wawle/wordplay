/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
export class Attributes<T> {
  constructor(private data: T) {}

  get = (key: keyof T): T[keyof T] => {
    return this.data[key];
  };

  set = (updateData: T): void => {
    Object.assign(this.data, updateData);
  };

  setProp = (data: T[keyof T]): void => {};

  getAll = (): T => {
    return this.data;
  };
}
