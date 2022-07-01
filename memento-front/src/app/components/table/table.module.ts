import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AbstractTable } from './abstract-table.component';
import { ReadTableComponent } from './read-table.component';
import { TableWrapperComponent } from './table-wrapper.component';

@NgModule({
  declarations: [TableWrapperComponent, ReadTableComponent, AbstractTable],
  imports: [CommonModule, MatTableModule, MatPaginatorModule, SpinnerComponent],
  exports: [TableWrapperComponent],
})
export class TableModule {}
