import { Component, Input, OnInit } from '@angular/core';
import { ITableComponent } from '../../shared/services/page.service';

@Component({
  selector: 'app-table-wrapper',
  template: `
    <ng-container class="container" [ngSwitch]="component.tableType">
      <ng-container *ngSwitchCase="'read'">
        <app-read-table [component]="component"></app-read-table>
      </ng-container>
      <ng-container *ngSwitchCase="'update'"></ng-container>
      <ng-container *ngSwitchCase="'crud'"></ng-container>
    </ng-container>
  `,
})
export class TableWrapperComponent {
  @Input() component!: ITableComponent;
}
