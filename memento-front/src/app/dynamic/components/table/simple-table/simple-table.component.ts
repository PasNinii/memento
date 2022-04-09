import { Component, Injector, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Entity,
  IService,
  TableComponent,
} from '../../../../shared/model/interface';
import { ServiceFactory } from '../../../../shared/services/service.enum';

@Component({
  selector: 'app-simple-table',
  template: `
    <ng-container *ngIf="entities$ | async as entities">
      <table mat-table [dataSource]="entities$" class="mat-elevation-z8">
        <ng-container [matColumnDef]="column" *ngFor="let column of columns">
          <th mat-header-cell *matHeaderCellDef>{{ column | titlecase }}</th>
          <td mat-cell *matCellDef="let element">{{ element[column] }}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns"></tr>
      </table>
    </ng-container>
  `,
  styleUrls: ['./simple-table.component.scss'],
})
export class SimpleTableComponent implements OnInit {
  private _service!: IService<Entity>;

  public entities$ = new Observable<Entity[]>();
  public columns: string[] = [];

  public component!: TableComponent;

  constructor(private readonly serviceFactory: ServiceFactory) {}

  ngOnInit() {
    this._service = this.serviceFactory.getService(this.component.service);
    this._service.load();
    this.entities$ = this._service.filteredEntities$;
    this.columns = this.component.columns;
  }
}
