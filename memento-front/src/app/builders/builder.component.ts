import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { TableModule } from '../components/table/table.module';
import {
  IComponent,
  IPage,
  ITableComponent,
  PageService,
} from '../shared/services/page.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    TableModule,
  ],
  template: `
    <div *ngIf="page$ | async as page">
      <ng-container *ngFor="let section of page.sections">
        <div class="grid-list root-container">
          <mat-grid-list [cols]="page.cols" [rowHeight]="page.rows">
            <mat-grid-tile
              class="component-container"
              *ngFor="let component of section.components"
              [colspan]="component.cols"
              [rowspan]="component.rows"
            >
              <ng-container [ngSwitch]="component.type">
                <ng-container *ngSwitchCase="'table'">
                  <app-table-wrapper class="container"
                    [component]="componentToTableComponent(component)"
                  ></app-table-wrapper>
                </ng-container>
              </ng-container>
            </mat-grid-tile>
          </mat-grid-list>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent {
  page$: Observable<IPage>;

  constructor(private readonly _pageService: PageService) {
    this.page$ = this._pageService.page$;
  }

  public componentToTableComponent(component: IComponent): ITableComponent {
    return component as ITableComponent;
  }
}
