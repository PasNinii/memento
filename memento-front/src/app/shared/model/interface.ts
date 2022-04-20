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
  isLoading$: Observable<boolean>;

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

export enum EntityType {
  ADD = 'ADD',
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
  DELETE = 'DELETE',
  EDIT = 'EDIT',
  NUMBER = 'NUMBER',
  TEXT = 'TEXT',
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
  cols: number;
  rowh: string;
  size: string;
  components: TableComponent[];
}

export const ComponentEnum = {
  SIMPLE_TABLE: {
    name: 'SIMPLE_TABLE',
    type: SimpleTableComponent,
  },
};

export interface Column {
  key: string;
  type: EntityType;
  format: string;
}

export type Columns = Column[];

export interface IComponent {
  type: 'SIMPLE_TABLE';
  cols: number;
  rows: number;
}

export interface TableComponent extends IComponent {
  service: ServiceEnum;
  columns: Columns;
}

export const MockConfig: Config = {
  cols: 4,
  rowh: '4em',
  size: '10px',
  components: [
    {
      cols: 4,
      rows: 6,
      type: 'SIMPLE_TABLE',
      service: ServiceEnum.MOVIE,
      columns: [
        { key: 'name', type: EntityType.TEXT, format: '' },
        { key: 'price', type: EntityType.NUMBER, format: '' },
        { key: 'createDate', type: EntityType.DATE, format: '' },
        { key: 'add', type: EntityType.ADD, format: '' },
        { key: 'edit', type: EntityType.EDIT, format: '' },
        { key: 'delete', type: EntityType.DELETE, format: '' },
      ],
    },
  ],
};

//     {
//       cols: 2,
//       rows: 6,
//       type: 'SIMPLE_TABLE',
//       service: ServiceEnum.MOVIE,
//       columns: [
//         { key: 'name', type: EntityType.TEXT, format: '' },
//         { key: 'price', type: EntityType.NUMBER, format: '' },
//         { key: 'createDate', type: EntityType.DATE, format: '' },
//         { key: 'add', type: EntityType.ADD, format: '' },
//         { key: 'edit', type: EntityType.EDIT, format: '' },
//         { key: 'delete', type: EntityType.DELETE, format: '' },
//       ],
//     },
//     {
//       cols: 2,
//       rows: 6,
//       type: 'SIMPLE_TABLE',
//       service: ServiceEnum.MOVIE,
//       columns: [
//         { key: 'name', type: EntityType.TEXT, format: '' },
//         { key: 'price', type: EntityType.NUMBER, format: '' },
//         { key: 'createDate', type: EntityType.DATE, format: '' },
//         { key: 'add', type: EntityType.ADD, format: '' },
//         { key: 'edit', type: EntityType.EDIT, format: '' },
//         { key: 'delete', type: EntityType.DELETE, format: '' },
//       ],
//     },
//     {
//       cols: 2,
//       rows: 6,
//       type: 'SIMPLE_TABLE',
//       service: ServiceEnum.MOVIE,
//       columns: [
//         { key: 'name', type: EntityType.TEXT, format: '' },
//         { key: 'price', type: EntityType.NUMBER, format: '' },
//         { key: 'createDate', type: EntityType.DATE, format: '' },
//         { key: 'add', type: EntityType.ADD, format: '' },
//         { key: 'edit', type: EntityType.EDIT, format: '' },
//         { key: 'delete', type: EntityType.DELETE, format: '' },
//       ],
//     },
//     {
//       cols: 2,
//       rows: 6,
//       type: 'SIMPLE_TABLE',
//       service: ServiceEnum.MOVIE,
//       columns: [
//         { key: 'name', type: EntityType.TEXT, format: '' },
//         { key: 'price', type: EntityType.NUMBER, format: '' },
//         { key: 'createDate', type: EntityType.DATE, format: '' },
//         { key: 'add', type: EntityType.ADD, format: '' },
//         { key: 'edit', type: EntityType.EDIT, format: '' },
//         { key: 'delete', type: EntityType.DELETE, format: '' },
//       ],
//     },
//     {
//       cols: 2,
//       rows: 6,
//       type: 'SIMPLE_TABLE',
//       service: ServiceEnum.MOVIE,
//       columns: [
//         { key: 'name', type: EntityType.TEXT, format: '' },
//         { key: 'price', type: EntityType.NUMBER, format: '' },
//         { key: 'createDate', type: EntityType.DATE, format: '' },
//         { key: 'add', type: EntityType.ADD, format: '' },
//         { key: 'edit', type: EntityType.EDIT, format: '' },
//         { key: 'delete', type: EntityType.DELETE, format: '' },
//       ],
//     },
//   ],
// };
