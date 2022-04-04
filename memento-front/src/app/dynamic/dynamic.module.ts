import { NgModule } from '@angular/core';
import { BasicModule } from '../shared/module/basic.module';
import { DynamicRoutingModule } from './dynamic-routing.module';
import { DynamicComponent } from './dynamic.component';

@NgModule({
  declarations: [DynamicComponent],
  imports: [BasicModule, DynamicRoutingModule],
})
export class DynamicModule {}
