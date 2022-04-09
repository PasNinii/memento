import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { ComponentEnum, ServiceEnum } from '../../../../shared/model/interface';
import { MovieService } from '../../../../shared/services/movie.service';
import { SerieService } from '../../../../shared/services/serie.service';
import { ServiceFactory } from '../../../../shared/services/service.enum';

import { SimpleTableComponent } from './simple-table.component';

describe('SimpleTableComponent', () => {
  let component: SimpleTableComponent;
  let fixture: ComponentFixture<SimpleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleTableComponent],
      providers: [
        ServiceFactory,
        MockProvider(MovieService),
        MockProvider(SerieService),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTableComponent);
    component = fixture.componentInstance;
    component.component = {
      type: ComponentEnum.SIMPLE_TABLE,
      service: ServiceEnum.MOVIE,
      columns: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
