import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { getMatIconNoHttpProviderError } from '@angular/material/icon';
import { filter, from, map, Observable, of } from 'rxjs';
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

  onMonthChange(event: any): void {
    const filter = this.months.findIndex((month) => month === event.value);

    const date = new Date();
    date.setMonth(filter);

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

  onCategoryChange(event: any): void {
    this.filters.category = event.value;

    this.expenditures.setFilter({ ...this.filters });
  }

  getExpenditureByCategory(category: string): Observable<Expenditure[]> {
    return this.expenditures$.pipe(
      map((expenditureList) =>
        expenditureList.filter(
          (expenditure) => expenditure.category.name === category
        )
      )
    );
  }
}
