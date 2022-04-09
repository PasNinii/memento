import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
      ],
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
