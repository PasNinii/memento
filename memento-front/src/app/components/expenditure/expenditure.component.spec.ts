import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { ExpenditureCategoryService } from '../../store/services/expenditure-category.service';
import { ExpenditureService } from '../../store/services/expenditure.service';

import { ExpenditureComponent } from './expenditure.component';

describe('ExpenditureComponent', () => {
  let component: ExpenditureComponent;
  let expenditures: ExpenditureService;
  let categories: ExpenditureCategoryService;
  let fixture: ComponentFixture<ExpenditureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MatDialogModule],
      declarations: [ExpenditureComponent],
      providers: [
        FormBuilder,
        MockProvider(ExpenditureService, {
          filteredEntities$: of([]),
        }),
        MockProvider(ExpenditureCategoryService, {
          filteredEntities$: of([]),
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenditureComponent);
    expenditures = TestBed.inject(ExpenditureService);
    categories = TestBed.inject(ExpenditureCategoryService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(expenditures).toBeTruthy();
    expect(component).toBeTruthy();
  });
});
