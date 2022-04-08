import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { ExpenditureCategoryService } from '../../../store/services/expenditure-category.service';
import { ExpenditureService } from '../../../store/services/expenditure.service';

import {
  ExpenditureCreateUpdateComponent,
  Mode,
} from './expenditure-create-update.component';

const data = Mode.CREATE;

describe('ExpenditureCreateUpdateComponent', () => {
  let component: ExpenditureCreateUpdateComponent;
  let fixture: ComponentFixture<ExpenditureCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ExpenditureCreateUpdateComponent],
      providers: [
        FormBuilder,
        MockProvider(ExpenditureService, {
          filteredEntities$: of([]),
        }),
        MockProvider(ExpenditureCategoryService, {
          filteredEntities$: of([]),
        }),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenditureCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
