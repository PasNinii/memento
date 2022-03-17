import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureCreateUpdateComponent } from './expenditure-create-update.component';

describe('ExpenditureCreateUpdateComponent', () => {
  let component: ExpenditureCreateUpdateComponent;
  let fixture: ComponentFixture<ExpenditureCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenditureCreateUpdateComponent ]
    })
    .compileComponents();
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
