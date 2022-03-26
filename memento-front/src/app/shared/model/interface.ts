import { Route } from '@angular/router';

export interface CustomRoute extends Route {
  name?: string;
  sidenav: boolean;
  toolbar: boolean;
  shellPath?: string;
  children?: CustomRoute[];
}
