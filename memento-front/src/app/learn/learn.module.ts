import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LearnRoutingModule } from './learn-routing.module';
import { LearnComponent } from './learn.component';
import { MovieListComponent } from './rxjs/operators/movie-list.component';
import { RxJSCompoent } from './rxjs/rxjs.component';
import { SubjectsComponent } from './rxjs/subjects/subjects.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieDetailComponent } from './rxjs/operators/movie-detail.component';
import { ScanComponent } from './rxjs/operators/scan.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    LearnRoutingModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    LearnComponent,
    RxJSCompoent,
    MovieDetailComponent,
    SubjectsComponent,
    MovieListComponent,
    ScanComponent,
  ],
})
export class LearnModule {}
