import {
  AfterViewInit,
  Component,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import {
  Entity,
  IService,
  TableComponent,
} from '../../../../shared/model/interface';
import { ServiceFactory } from '../../../../shared/services/service.enum';

@Component({
  selector: 'app-simple-table',
  template: `
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <ng-container [matColumnDef]="column" *ngFor="let column of columns">
        <th mat-header-cell *matHeaderCellDef>{{ column | titlecase }}</th>
        <td mat-cell *matCellDef="let element">{{ element[column] }}</td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns"></tr>
    </table>

    <mat-paginator
      [pageSizeOptions]="[5, 10, 20, 40, 80]"
      showFirstLastButtons
      aria-label="Select page of periodic elements"
    >
    </mat-paginator>
  `,
  styleUrls: ['./simple-table.component.scss'],
})
export class SimpleTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private _service!: IService<Entity>;
  private readonly _synk$ = new Subscription();

  public columns: string[] = [];
  public readonly dataSource = new MatTableDataSource<Entity>([]);
  public readonly component!: TableComponent;

  @ViewChild(MatPaginator) public readonly paginator!: MatPaginator;

  constructor(private readonly serviceFactory: ServiceFactory) {}

  ngOnInit(): void {
    this._service = this.serviceFactory.getService(this.component.service);
    this._service.load();

    this._synk$.add(
      this._service.filteredEntities$.subscribe(
        (entities) => (this.dataSource.data = entities)
      )
    );

    this.columns = this.component.columns;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this._synk$.unsubscribe();
  }
}
