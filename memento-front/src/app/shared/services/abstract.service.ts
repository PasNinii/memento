import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, expand, map, Observable, of, scan } from 'rxjs';
import { Entity, CommonObject, Response, IService } from '../model/interface';
import { SnackService } from './snack.service';

@Injectable({
  providedIn: 'root',
})
export class Service<T extends Entity> implements IService<T> {
  private readonly _filters$ = new BehaviorSubject<CommonObject>({});
  private readonly _entities$ = new BehaviorSubject<T[]>([]);
  private readonly _id$ = new BehaviorSubject<string>('');
  private readonly _isLoading$ = new BehaviorSubject<boolean>(false);

  protected url: string = '';

  public entities$ = this._entities$.asObservable();
  public isLoading$ = this._isLoading$.asObservable();
  public filteredEntities$: Observable<T[]>;
  public selectedEntity$: Observable<T | undefined>;

  constructor(protected readonly http: HttpClient, protected readonly snacks: SnackService) {
    this.filteredEntities$ = combineLatest([this.entities$, this._filters$]).pipe(
      map(([values, filters]) =>
        values.filter((value) =>
          Object.entries(filters).every(([k, v]) => {
            if (k in value) {
              return this.dynamicFilter(k as keyof T, value, v.value, v.operand);
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
    if (reload || (!(this.entities.length > 0) && !this.isLoading)) {
      this._isLoading$.next(true);

      this.http.get<T[]>(`${this.url}${path}`).subscribe({
        next: (values) => {
          this._entities$.next(values);
          this.snacks.log('Loaded with success', 'success');
          this._isLoading$.next(false);
        },
        error: (error) => {
          console.log(error);
          this.snacks.log(error?.message, 'error');
          this._isLoading$.next(false);
        },
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
        .subscribe({
          next: (values) => {
            this._entities$.next(values);
            this.snacks.log('Loaded with success', 'success');
          },
          error: (error) => {
            console.log(error);
            this.snacks.log(error?.message, 'error');
          },
        });
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

  public get isLoading(): boolean {
    return this._isLoading$.getValue();
  }

  private getFromUrl(url: string = ''): Observable<Response<T>> {
    return this.http.get<Response<T>>(`${url}`);
  }

  // TODO: Make it more flexible
  // TODO: of scalable solution with Params / QueryParams & More
  private getWithParams(page: number = 1): Observable<Response<T>> {
    return this.http.get<Response<T>>(`${this.url}?page=${page}`);
  }

  private dynamicFilter(key: keyof T, entity: T, valueFromFilter: any, operand: string): boolean {
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
        if (typeof value === 'string' && valueFromFilter !== '') return value.includes(valueFromFilter);
        return true;

      default:
        return value === valueFromFilter;
    }
  }
}
