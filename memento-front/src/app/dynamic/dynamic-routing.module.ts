import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { CustomRoute } from '../shared/model/interface';
import { DynamicComponent } from './dynamic.component';

export const routes: CustomRoute[] = [
  {
    path: '',
    component: DynamicComponent,
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
