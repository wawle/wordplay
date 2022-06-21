export class Attributes<T> {
  constructor(private data: T) {}

  get = (key: keyof T): T[keyof T] => {
    return this.data[key];
  };

  set = (updateData: T): void => {
    Object.assign(this.data, updateData);
  };

  setProp = (key: keyof T, value: T[keyof T]): void => {
    this.data[key] = value;
  };

  getAll = (): T => {
    return this.data;
  };
}
