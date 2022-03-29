import { Route } from '@angular/router';

/**
 * Generic Interface
 */
export interface CustomRoute extends Route {
  name?: string;
  sidenav: boolean;
  toolbar: boolean;
  shellPath?: string;
  children?: CustomRoute[];
}

export interface Response<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export class CommonObject {
  [key: string | number | symbol]: Value;
}

export interface Entity {
  id: string;
}

export interface Value {
  value: any;
  operand: string;
}

/**
 * Entity Interface
 */
export interface Movie {
  id: string;
  name: string;
}

export interface Planet {
  id: string;
  name: string;
  rotation_period: string;
}

export type Movies = Movie[];
export type Planets = Planet[];
