import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [CommonModule, FlexLayoutModule, FormsModule],
})
export class BasicModule {}
