import { NgModule } from '@angular/core';
import { LearnRoutingModule } from './learn-routing.module';
import { LearnComponent } from './learn.component';
import { MovieListComponent } from './rxjs/operators/movie-list.component';
import { RxJSComponent } from './rxjs/rxjs.component';
import { SubjectsComponent } from './rxjs/subjects/subjects.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieDetailComponent } from './rxjs/operators/movie-detail.component';
import { ScanComponent } from './rxjs/operators/scan.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BasicModule } from '../shared/module/basic.module';

@NgModule({
  imports: [
    LearnRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    BasicModule,
  ],
  declarations: [
    LearnComponent,
    RxJSComponent,
    MovieDetailComponent,
    SubjectsComponent,
    MovieListComponent,
    ScanComponent,
  ],
})
export class LearnModule {}
