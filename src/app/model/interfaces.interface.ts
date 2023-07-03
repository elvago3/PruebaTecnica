import { Token } from "@angular/compiler";

export interface Login {
  Email: string;
  Password: string;
}

export interface Response {
  status_code: number;
  result: dataHandler;
}

export interface dataHandler {
  token: string,
  ts: string,
  email: string,
  name: string
}

export interface Data {
  id?: string,
  name?: string,
  img?: string,
  fleet?: string,
  lastReport?: string,
  sensors?: Sensor[]
}

export interface Sensor {
  id: string,
  name: string,
  type: string
}

export interface Platforms {
  data: Data
}
