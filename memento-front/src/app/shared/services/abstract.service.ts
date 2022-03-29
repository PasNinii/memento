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
import { Entity, Filter, Response } from '../model/interface';

@Injectable({
  providedIn: 'root',
})
export class Service<T extends Entity> {
  private readonly filters$ = new BehaviorSubject<Filter>({});
  private readonly _entities$ = new BehaviorSubject<T[]>([]);
  private readonly id$ = new BehaviorSubject<string>('');

  protected url: string = '';

  public entities$ = this._entities$.asObservable();
  public filteredEntities$: Observable<T[]>;
  public selectedEntity$: Observable<T | undefined>;

  constructor(protected readonly http: HttpClient) {
    this.filteredEntities$ = combineLatest([
      this.entities$,
      this.filters$,
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

    this.selectedEntity$ = combineLatest([this.entities$, this.id$]).pipe(
      map(([entities, id]) => {
        return entities.find((entity) => entity.id === id);
      })
    );
  }

  public load(reload: boolean = false, path: string = ''): void {
    if (reload || !(this.entities.length > 0)) {
      this.http
        .get<T[]>(`${this.url}${path}`)
        .subscribe((values) => this._entities$.next(values));
    }
  }

  public loadPaginated(reload: boolean = false): void {
    if (reload || !(this.entities.length > 0)) {
      this.getWithParams()
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

    this.id$.next(id);
  }

  public get entities() {
    return this._entities$.getValue();
  }

  private getFromUrl(url: string = ''): Observable<Response<T>> {
    return this.http.get<Response<T>>(`${url}`);
  }

  private getWithParams(page: number = 1): Observable<Response<T>> {
    return this.http.get<Response<T>>(`${this.url}?page=${page}`);
  }

  private dynamicFilter(k: keyof T, t: T, v: any, operand: string): boolean {
    const value = t[k];

    switch (operand) {
      case '>':
        return value > v;

      case '>=':
        return value >= v;

      case '<':
        return value < v;

      case '<=':
        return value <= v;

      case '===':
        return value === v;

      default:
        return value === v;
    }
  }
}
