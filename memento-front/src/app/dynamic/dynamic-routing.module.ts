import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { CustomRoute } from '../shared/model/interface';
import { RootComponent } from './root.component';

export const routes: CustomRoute[] = [
  {
    path: '',
    component: RootComponent,
    canActivate: [AuthGuard],
    name: '',
    toolbar: false,
    sidenav: false,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DynamicRoutingModule {}
