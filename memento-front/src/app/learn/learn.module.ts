import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { LearnRoutingModule } from './learn-routing.module';
import { LearnComponent } from './learn.component';
import { MovieDetailComponent } from './rxjs/operators/movie-detail.component';
import { MovieListComponent } from './rxjs/operators/movie-list.component';
import { ScanComponent } from './rxjs/operators/scan.component';
import { RxJSComponent } from './rxjs/rxjs.component';
import { SubjectsComponent } from './rxjs/subjects/subjects.component';

@NgModule({
  imports: [
    LearnRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
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
