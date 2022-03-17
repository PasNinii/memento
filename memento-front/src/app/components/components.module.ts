import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { ExpenditureListComponent } from './expenditure/expenditure-list/expenditure-list.component';
import { ExpenditureDetailComponent } from './expenditure/expenditure-detail/expenditure-detail.component';
import { ExpenditureCreateUpdateComponent } from './expenditure/expenditure-create-update/expenditure-create-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ExpenditureComponent,
    ExpenditureListComponent,
    ExpenditureDetailComponent,
    ExpenditureCreateUpdateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
})
export class ComponentsModule {}
