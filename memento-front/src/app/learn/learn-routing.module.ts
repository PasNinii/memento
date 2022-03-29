import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { CustomRoute } from '../shared/model/interface';
import { LearnComponent } from './learn.component';
import { MovieDetailComponent } from './rxjs/operators/movie-detail.component';
import { MovieListComponent } from './rxjs/operators/movie-list.component';
import { ScanComponent } from './rxjs/operators/scan.component';
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
      {
        path: 'planets',
        component: ScanComponent,
        name: 'Planets',
        shellPath: 'learn/rxjs/planets',
        toolbar: false,
        sidenav: true,
      },
      {
        path: 'movies',
        component: MovieListComponent,
        canActivate: [AuthGuard],
        name: 'Movies',
        shellPath: 'learn/rxjs/movies',
        toolbar: false,
        sidenav: true,
        children: [
          {
            path: 'detail/:id',
            component: MovieDetailComponent,
            name: '',
            shellPath: '',
            toolbar: false,
            sidenav: false,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnRoutingModule {}
