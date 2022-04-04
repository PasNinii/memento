import { Component, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { routes as appRoutes } from '../../app-routing.module';
import { routes as learnRoutes } from '../../learn/learn-routing.module';
import { routes as dynamicRoutes } from '../../dynamic/dynamic-routing.module';
import { CustomRoute } from '../model/interface';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  readonly appRoutes: CustomRoute[] = appRoutes;
  activeRoute$: Observable<CustomRoute[]>;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    private readonly router: Router
  ) {
    this.activeRoute$ = this.router.events.pipe(
      filter((events) => events instanceof NavigationEnd),
      map((events) => {
        const e = events as NavigationEnd;

        if (e.url.includes('learn')) return learnRoutes;
        if (e.url.includes('dynamic')) return dynamicRoutes;

        return appRoutes;
      })
    );
  }
}
