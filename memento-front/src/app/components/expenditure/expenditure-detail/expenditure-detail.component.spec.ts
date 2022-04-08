import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Expenditure } from '../../../shared/model/expenditure';

import { ExpenditureDetailComponent } from './expenditure-detail.component';

const expenditureMock = {
  name: 'Test expenditure',
};

describe('ExpenditureDetailComponent', () => {
  let component: ExpenditureDetailComponent;
  let fixture: ComponentFixture<ExpenditureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenditureDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenditureDetailComponent);
    component = fixture.componentInstance;
    component.expenditure = expenditureMock as Expenditure;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
