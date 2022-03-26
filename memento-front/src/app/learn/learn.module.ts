import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LearnRoutingModule } from './learn-routing.module';
import { LearnComponent } from './learn.component';
import { RxJSCompoent } from './rxjs/rxjs.component';
import { SubjectsComponent } from './rxjs/subjects/subjects.component';

@NgModule({
  imports: [FlexLayoutModule, LearnRoutingModule],
  declarations: [LearnComponent, RxJSCompoent, SubjectsComponent],
})
export class LearnModule {}
