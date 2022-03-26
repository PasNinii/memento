import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { CustomRoute } from '../shared/model/interface';
import { LearnComponent } from './learn.component';
import { RxJSCompoent } from './rxjs/rxjs.component';
import { SubjectsComponent } from './rxjs/subjects/subjects.component';

export const routes: CustomRoute[] = [
  {
    path: '',
    component: LearnComponent,
    canActivate: [AuthGuard],
    name: '',
    toolbar: false,
    sidenav: false,
  },
  {
    path: 'rxjs',
    component: RxJSCompoent,
    name: 'RxJS',
    toolbar: false,
    sidenav: false,
    children: [
      {
        path: 'subjects',
        component: SubjectsComponent,
        canActivate: [AuthGuard],
        name: 'Subjects',
        shellPath: 'learn/rxjs/subjects',
        toolbar: false,
        sidenav: true,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnRoutingModule {}
