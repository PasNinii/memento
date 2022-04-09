import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard, AuthService } from '@auth0/auth0-angular';
import { ExpenditureComponent } from '../../components/expenditure/expenditure.component';
import { HomePageComponent } from '../../home-page/home-page.component';
import { CustomRoute } from '../model/interface';

import { ShellComponent } from './shell.component';

const routesMock: CustomRoute[] = [
  {
    path: '',
    component: HomePageComponent,
    name: 'Home',
    toolbar: true,
    sidenav: false,
  },
  {
    path: 'expenditures',
    component: ExpenditureComponent,
    canActivate: [AuthGuard],
    name: 'Expenditures 🈳',
    toolbar: false,
    sidenav: true,
  },
];

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routesMock),
        MatMenuModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatDividerModule,
      ],
      declarations: [ShellComponent],
      providers: [{ provide: AuthService, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
