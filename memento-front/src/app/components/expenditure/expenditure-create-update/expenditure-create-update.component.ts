import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ExpenditureCategory } from '../../../shared/model/expenditure';
import { ExpenditureCategoryService } from '../../../store/services/expenditure-category.service';
import { ExpenditureService } from '../../../store/services/expenditure.service';

export enum Mode {
  CREATE = 'create',
  UPDATE = 'update',
}

@Component({
  selector: 'app-expenditure-create-update',
  templateUrl: './expenditure-create-update.component.html',
  styleUrls: ['./expenditure-create-update.component.scss'],
})
export class ExpenditureCreateUpdateComponent implements OnInit {
  mode: string = Mode.CREATE;
  categories$: Observable<ExpenditureCategory[]>;

  expenditureForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
    expendDate: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private readonly expenditures: ExpenditureService,
    private readonly categories: ExpenditureCategoryService,
    public dialogRef: MatDialogRef<ExpenditureCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) {
    this.categories$ = this.categories.filteredEntities$;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.expenditureForm.valid) {
      this.expenditures.add(this.expenditureForm.value);
      this.dialogRef.close();
    }
  }
}
