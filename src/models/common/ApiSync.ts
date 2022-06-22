import axios, { AxiosPromise } from "axios";

export class ApiSync<T> {
  public rootUrl: string = "http://localhost:3000";
  constructor(public resource?: string) {}

  fetch(): AxiosPromise<T> {
    return axios.get(`${this.rootUrl}/${this.resource}`);
  }

  save(data: T): AxiosPromise<T> {
    return axios.post(`${this.rootUrl}/${this.resource}`, data);
  }
}
