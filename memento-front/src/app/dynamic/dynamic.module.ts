import { NgModule } from '@angular/core';
import { BasicModule } from '../shared/module/basic.module';
import { DynamicRoutingModule } from './dynamic-routing.module';
import { DynamicComponent } from './dynamic.component';
import { SimpleTableComponent } from './components/table/simple-table/simple-table.component';
import { SortTableComponent } from './components/table/sort-table/sort-table.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CustomComponentDirective } from '../shared/directives/custom-component.directive';

@NgModule({
  declarations: [
    CustomComponentDirective,
    DynamicComponent,
    SimpleTableComponent,
    SortTableComponent,
  ],
  imports: [CommonModule, BasicModule, DynamicRoutingModule, MatTableModule],
})
export class DynamicModule {}
