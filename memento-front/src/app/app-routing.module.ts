import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { ExpenditureComponent } from './components/expenditure/expenditure.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ErrorComponent } from './shared/errors/error.component';
import { CustomRoute } from './shared/model/interface';

export const routes: CustomRoute[] = [
  {
    path: '',
    component: HomePageComponent,
    name: 'Home',
    toolbar: true,
    sidenav: false,
  },
  {
    path: 'expenditures',
    component: ExpenditureComponent,
    canActivate: [AuthGuard],
    name: 'Expenditures 🈳',
    toolbar: false,
    sidenav: true,
  },
  {
    path: 'learn',
    loadChildren: () => import('./learn/learn.module').then((m) => m.LearnModule),
    canActivate: [AuthGuard],
    name: 'Learn 🧠',
    toolbar: true,
    sidenav: false,
  },
  {
    path: 'dynamic',
    loadChildren: () => import('./dynamic/dynamic.module').then((m) => m.DynamicModule),
    canActivate: [AuthGuard],
    name: 'Dynamic 🚀',
    toolbar: true,
    sidenav: false,
  },
  {
    path: 'games',
    loadChildren: () => import('./games/games.module').then((m) => m.GamesModule),
    canActivate: [AuthGuard],
    name: 'Games 🎳',
    toolbar: true,
    sidenav: false,
  },
  {
    path: '**',
    component: ErrorComponent,
    toolbar: false,
    sidenav: false,
    name: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
