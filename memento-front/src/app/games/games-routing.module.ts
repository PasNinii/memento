import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { CustomRoute } from '../shared/model/interface';
import { RoomsComponent } from './rooms/rooms.component';

export const routes: CustomRoute[] = [
  {
    path: '',
    component: RoomsComponent,
    canActivate: [AuthGuard],
    name: '',
    toolbar: false,
    sidenav: false,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class GamesRoutingModule {}
