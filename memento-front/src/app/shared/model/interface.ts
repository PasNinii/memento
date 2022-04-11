import { Route } from '@angular/router';
import { Observable } from 'rxjs';
import { SimpleTableComponent } from '../../dynamic/components/table/simple-table/simple-table.component';

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

export interface Value {
  value: any;
  operand: string;
}

/**
 *
 */
export const enum ServiceEnum {
  MOVIE = 'MOVIE',
  SERIE = 'SERIE',
  EXPENDITURE = 'EXPENDITURE',
  EXPENDITURE_CATEGORIE = 'EXPENDITURE_CATEGORIE',
}

export interface IService<T extends Entity> {
  entities$: Observable<T[]>;
  filteredEntities$: Observable<T[]>;
  selectedEntity$: Observable<T | undefined>;

  load(reload?: boolean, path?: string): void;
  loadPaginated(reload: boolean, firstPage: number): void;
  setId(id: string, load: boolean): void;
  setFilter(filter: CommonObject): void;
  get entities(): T[];
}

/**
 * Entity Interface
 */
export interface Entity {
  id: string;
}

export interface Movie extends Entity {
  id: string;
  name: string;
}

export interface Planet extends Entity {
  id: string;
  name: string;
  rotation_period: string;
}

export type Movies = Movie[];
export type Planets = Planet[];

/**
 * Config
 */
export interface Config {
  components: TableComponent[];
}

export const ComponentEnum = {
  SIMPLE_TABLE: {
    name: 'SIMPLE_TABLE',
    type: SimpleTableComponent,
  },
};

export interface TableComponent {
  type: any;
  service: ServiceEnum;
  columns: string[];
}

export const MockConfig: Config = {
  components: [
    {
      type: 'SIMPLE_TABLE',
      service: ServiceEnum.EXPENDITURE,
      columns: ['name', 'price', 'createDate'],
    },
    {
      type: 'SIMPLE_TABLE',
      service: ServiceEnum.MOVIE,
      columns: ['name'],
    },
  ],
};
