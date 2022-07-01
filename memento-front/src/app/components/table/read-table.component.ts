import { Component } from '@angular/core';
import { AbstractTable } from './abstract-table.component';

@Component({
  selector: 'app-read-table',
  template: `
    <app-spinner *ngIf="!(isLoaded$ | async); else table"></app-spinner>

    <ng-template #table>
      <ng-container *ngIf="dataSource.data.length > 0; else noData">
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
          <ng-container
            [matColumnDef]="column.key"
            *ngFor="let column of columns"
          >
            <th mat-header-cell *matHeaderCellDef>
              {{ column.key | titlecase }}
            </th>
            <td mat-cell *matCellDef="let element">
              <ng-container [ngSwitch]="column.type">
                {{ element[column.key] }}
              </ng-container>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="getColumnsName()"></tr>
          <tr mat-row *matRowDef="let row; columns: getColumnsName()"></tr>
        </table>
      </ng-container>
      <ng-template #noData>
        <div fxLayout="row" fxLayoutAlign="center center">
          <h1>
            No data available. Check your backend & database statuses ! 💩
          </h1>
        </div>
      </ng-template>
    </ng-template>

    <mat-paginator
      [ngClass]="
        (isLoaded$ | async) || dataSource.data.length === 0 ? 'hidden' : ''
      "
      [pageSizeOptions]="[5, 10]"
      showFirstLastButtons
      aria-label="Select page of periodic elements"
    >
    </mat-paginator>
  `,
  styleUrls: ['./table.component.scss'],
})
export class ReadTableComponent extends AbstractTable {}
