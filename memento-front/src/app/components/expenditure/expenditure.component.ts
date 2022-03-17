import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { getMatIconNoHttpProviderError } from '@angular/material/icon';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { StoreRootModule } from '@ngrx/store';
import { filter, from, isEmpty, map, Observable, of } from 'rxjs';
import { MONTHS } from '../../shared/model/date';
import {
  Expenditure,
  ExpenditureCategory,
} from '../../shared/model/expenditure';
import { ExpenditureFilter } from '../../shared/model/expenditure-filter';
import { ExpenditureCategoryService } from '../../store/services/expenditure-category.service';
import { ExpenditureService } from '../../store/services/expenditure.service';
import {
  ExpenditureCreateUpdateComponent,
  Mode,
} from './expenditure-create-update/expenditure-create-update.component';

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.scss'],
})
export class ExpenditureComponent implements OnInit {
  categories$: Observable<ExpenditureCategory[]>;
  expenditures$: Observable<Expenditure[]>;
  months = MONTHS;
  filters = new ExpenditureFilter();
  selectedCategory: string = 'All';

  constructor(
    public dialog: MatDialog,
    private readonly expenditures: ExpenditureService,
    private readonly categories: ExpenditureCategoryService
  ) {
    this.categories$ = this.categories.filteredEntities$;
    this.expenditures$ = this.expenditures.filteredEntities$;
  }

  ngOnInit(): void {
    this.expenditures.load();
    this.categories.load();
  }

  createExpenditureDialog(): void {
    MatDialogConfig;
    this.dialog.open(ExpenditureCreateUpdateComponent, {
      width: '25%',
      data: { mode: Mode.CREATE },
    });
  }

  onMonthChange(event: MatSelectChange): void {
    if (event.value === 'All') {
      this.filters.resetDate();
      this.expenditures.setFilter({ ...this.filters });
      return;
    }

    const filter = this.months.findIndex((month) => month === event.value);

    const date = new Date();
    date.setMonth(filter - 1);

    const firstDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).toISOString();

    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).toISOString();

    this.filters.firstDay = firstDay;
    this.filters.lastDay = lastDay;

    this.expenditures.setFilter({ ...this.filters });
  }

  onCategoryChange(): void {
    if (this.selectedCategory === 'All') {
      this.filters.resetCategory();
      this.expenditures.setFilter({ ...this.filters });
      return;
    }

    this.filters.category = this.selectedCategory;
    this.expenditures.setFilter({ ...this.filters });
  }

  isExpenditureCategoryEmpty(category: string): Observable<boolean> {
    return this.getExpenditureByCategory(category).pipe(
      map((expditureList) => expditureList.length > 0)
    );
  }

  getExpenditureByCategory(category: string): Observable<Expenditure[]> {
    return this.expenditures$.pipe(
      map((expenditureList) => {
        return expenditureList.filter(
          (expenditure) => expenditure.category.name === category
        );
      })
    );
  }
}
