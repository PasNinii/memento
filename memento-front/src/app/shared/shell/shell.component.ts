import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BuilderComponent } from '../../builders/builder.component';

export interface IRoute extends Route {
  id: string;
}

export type Routes = IRoute[];

const getComponent = (componentName: any): any => {
  switch (componentName) {
    case 'BuilderComponent':
      return BuilderComponent;
    default:
      return BuilderComponent;
  }
};

@Component({
  selector: 'app-shell',
  template: `
    <app-spinner *ngIf="!(routes$ | async); else shell"></app-spinner>

    <ng-template #shell>
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav
          #drawer
          class="sidenav"
          fixedInViewport
          [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
          [mode]="(isHandset$ | async) ? 'over' : 'side'"
          [opened]="false"
        >
          <mat-toolbar>Menu</mat-toolbar>
          <mat-divider></mat-divider>
          <mat-nav-list *ngIf="routes$ | async as routes">
            <ng-template #recursive let-routes>
              <ng-container *ngFor="let route of routes">
                <a
                  mat-list-item
                  [routerLink]="route?.shellPath ? route.shellPath : route.path"
                  *ngIf="route.sidenav"
                  >{{ route.name }}</a
                >
                <section *ngIf="route?.children?.length > 0">
                  <ng-container
                    *ngTemplateOutlet="
                      recursive;
                      context: { $implicit: route?.children }
                    "
                  ></ng-container>
                </section>
              </ng-container>
            </ng-template>
            <ng-container
              *ngTemplateOutlet="recursive; context: { $implicit: routes }"
            ></ng-container>
          </mat-nav-list>
        </mat-sidenav>
        <mat-sidenav-content>
          <mat-toolbar>
            <button
              type="button"
              aria-label="Toggle sidenav"
              mat-icon-button
              (click)="drawer.toggle()"
            >
              <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
            </button>
            <span class="logo" routerLink="/page/simple">🚀 Memento</span>

            <span class="fill-space"></span>
            <div
              *ngIf="
                (isHandset$ | async) === false ||
                (isHandset$ | async) === undefined ||
                (isHandset$ | async) === null
              "
            >
              <ng-container *ngFor="let route of routes$ | async">
                <a mat-button [routerLink]="route.path">{{
                  route.id | titlecase
                }}</a>
              </ng-container>
            </div>

            <button
              mat-icon-button
              [matMenuTriggerFor]="menu"
              aria-label="Example icon-button with a menu"
            >
              <mat-icon>more_vert</mat-icon>
            </button>

            <mat-menu #menu="matMenu">
              <a mat-menu-item href="https://github.com/PasNinii/cowboy-front">
                <i>💬</i>
                <span>Code on Github (front)</span>
              </a>
              <a mat-menu-item href="https://github.com/PasNinii/cowboy-back">
                <i>💾</i>
                <span>Code on Github (back)</span>
              </a>
            </mat-menu>
          </mat-toolbar>

          <ng-content> </ng-content>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </ng-template>
  `,
  styles: [
    `
      .sidenav-container {
        height: 100%;
      }

      .logo {
        font-size: 1.2em;
        cursor: pointer;
        outline: none;
      }

      .mat-drawer-side {
        border: none;
        box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.3);
      }

      .sidenav {
        width: 200px;
        font-family: sofia-pro;
      }

      .sidenav .mat-toolbar {
        background: inherit;
      }

      .mat-toolbar.mat-primary {
        position: sticky;
        top: 0;
        z-index: 1;
      }

      .fill-space {
        flex: 1 1 auto;
      }

      i {
        font-style: normal;
        font-size: 1.25em;
        margin-right: 16px;
      }

      .avatar {
        width: 1.75em;
        border-radius: 50%;
        margin: 0 10px 5px;
      }
    `,
  ],
})
export class ShellComponent {
  public readonly isHandset$: Observable<boolean>;
  public readonly routes$: Observable<Routes>;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    private _breakpointObserver: BreakpointObserver,
    private readonly _router: Router,
    private readonly _http: HttpClient
  ) {
    this.isHandset$ = this._breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );

    this.routes$ = this._http
      .get<Routes>(`${environment.server.rest}/routes`)
      .pipe(
        map((routes) =>
          routes.map((route) => ({
            ...route,
            component: getComponent(route.component),
          }))
        ),
        tap((routes) => this._router.resetConfig(routes))
      );
  }
}
