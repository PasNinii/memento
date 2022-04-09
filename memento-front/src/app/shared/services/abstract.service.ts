import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  empty,
  expand,
  map,
  Observable,
  of,
  scan,
} from 'rxjs';
import { Entity, CommonObject, Response, IService } from '../model/interface';

@Injectable({
  providedIn: 'root',
})
export class Service<T extends Entity> implements IService<T> {
  private readonly _filters$ = new BehaviorSubject<CommonObject>({});
  private readonly _entities$ = new BehaviorSubject<T[]>([]);
  private readonly _id$ = new BehaviorSubject<string>('');
  private _isLoading: boolean = false;

  protected url: string = '';

  public entities$ = this._entities$.asObservable();
  public filteredEntities$: Observable<T[]>;
  public selectedEntity$: Observable<T | undefined>;

  constructor(protected readonly http: HttpClient) {
    this.filteredEntities$ = combineLatest([
      this.entities$,
      this._filters$,
    ]).pipe(
      map(([values, filters]) =>
        values.filter((value) =>
          Object.entries(filters).every(([k, v]) => {
            if (k in value) {
              return this.dynamicFilter(
                k as keyof T,
                value,
                v.value,
                v.operand
              );
            }
            return true;
          })
        )
      )
    );

    this.selectedEntity$ = combineLatest([this.entities$, this._id$]).pipe(
      map(([entities, id]) => {
        return entities.find((entity) => entity.id === id);
      })
    );
  }

  public load(reload: boolean = false, path: string = ''): void {
    console.log(this._isLoading);

    if (reload || (!(this.entities.length > 0) && !this._isLoading)) {
      this._isLoading = true;

      this.http.get<T[]>(`${this.url}${path}`).subscribe((values) => {
        this._entities$.next(values);
        this._isLoading = false;
      });
    }
  }

  public loadPaginated(reload: boolean = false, firstPage: number = 1): void {
    if (reload || !(this.entities.length > 0)) {
      this.getWithParams(firstPage)
        .pipe(
          expand((response) => {
            return response.next ? this.getFromUrl(response.next) : of();
          }),
          map((response: Response<T>) => response.results),
          scan((acc, results) => {
            if (results && results !== undefined) return [...acc, ...results];
            return [...acc];
          }, [] as T[])
        )
        .subscribe((values) => this._entities$.next(values));
    }
  }

  public setId(id: string, load: boolean = false): void {
    if (load) {
      this.selectedEntity$ = this.http.get<T>(`${this.url}/${id}`);
      return;
    }

    this._id$.next(id);
  }

  public setFilter(filter: CommonObject) {
    this._filters$.next(filter);
  }

  public get entities(): T[] {
    return this._entities$.getValue();
  }

  private getFromUrl(url: string = ''): Observable<Response<T>> {
    return this.http.get<Response<T>>(`${url}`);
  }

  private getWithParams(page: number = 1): Observable<Response<T>> {
    return this.http.get<Response<T>>(`${this.url}?page=${page}`);
  }

  private dynamicFilter(
    key: keyof T,
    entity: T,
    valueFromFilter: any,
    operand: string
  ): boolean {
    const value = entity[key];

    switch (operand) {
      case '>':
        return value > valueFromFilter;

      case '>=':
        return value >= valueFromFilter;

      case '<':
        return value < valueFromFilter;

      case '<=':
        return value <= valueFromFilter;

      case '===':
        return value === valueFromFilter;

      case 'includes':
        if (typeof value === 'string' && valueFromFilter !== '')
          return value.includes(valueFromFilter);
        return true;

      default:
        return value === valueFromFilter;
    }
  }
}
