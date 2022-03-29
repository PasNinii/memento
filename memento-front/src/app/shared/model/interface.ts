import { Route } from '@angular/router';

export interface CustomRoute extends Route {
  name?: string;
  sidenav: boolean;
  toolbar: boolean;
  shellPath?: string;
  children?: CustomRoute[];
}

export interface Rectangle {
  width: number;
  height: number;
}

export class Filter {
  [key: string | number | symbol]: Value;
}

export interface Value {
  value: any;
  operand: string;
}

export interface Movie {
  id: string;
  name: string;
}

export type Movies = Movie[];

export interface Entity {
  id: string;
}

export interface Response<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface Planet {
  id: string;
  name: string;
  rotation_period: string;
}
