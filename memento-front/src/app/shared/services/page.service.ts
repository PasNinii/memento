import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Subscription, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface IView {
  id: string;
  title: string;
  description: string;
  rows: number | string;
  cols: number;
}

export interface IPage extends IView {
  sections: ISection[];
}

export interface ISection extends IView {
  rows: number;
  components: IComponent[];
}

export interface IComponent extends IView {
  type: string;
  service: string;
}

export interface Column {
  key: string;
  type: string;
  title: string;
}

export interface ITableComponent extends IComponent {
  tableType: string;
  columns: Column[];
}

@Injectable({
  providedIn: 'root',
})
export class PageService implements OnDestroy {
  private readonly _sink$ = new Subscription();
  private readonly _page$ = new BehaviorSubject<IPage>({} as IPage);
  public readonly page$ = this._page$.asObservable();

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {
    /**
     * Fetch page configuration from server based on current url, for every
     * router event, i.e, when we navigate fetch new page config
     *
     * TODO: Should it be cached ? (ngrx, dexie, ...)
     */
    this._sink$.add(
      this._router.events
        .pipe(
          filter((events) => events instanceof NavigationEnd),
          switchMap((events: any) =>
            this._http.get<IPage>(`${environment.server.rest}${events.url}`)
          )
        )
        .subscribe((page: IPage) => this._page$.next(page))
    );
  }

  ngOnDestroy(): void {
    this._sink$.unsubscribe();
  }
}
