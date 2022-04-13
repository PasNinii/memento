import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, Subscription, tap } from 'rxjs';
import { Column, Columns, Entity, IService, TableComponent } from '../../../../shared/model/interface';
import { ServiceFactory } from '../../../../shared/services/service.enum';
import { EntityType } from '../../../../shared/model/interface';

@Component({
  selector: 'app-simple-table',
  template: `
    <ng-container *ngIf="isLoading$ | async; else table">
      <mat-spinner></mat-spinner>
    </ng-container>
    <ng-template #table>
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <ng-container [matColumnDef]="column.key" *ngFor="let column of columns">
          <th mat-header-cell *matHeaderCellDef>{{ column.key | titlecase }}</th>
          <td mat-cell *matCellDef="let element">
            <ng-container [ngSwitch]="column.type">
              <ng-container *ngIf="!element.isEdit; else editRow">
                <div *ngSwitchCase="types.TEXT">
                  {{ element[column.key] }}
                </div>
                <div *ngSwitchCase="types.EDIT">
                  <button mat-raised-button (click)="element.isEdit = !element.isEdit">
                    <mat-icon>edit</mat-icon> Edit
                  </button>
                </div>
              </ng-container>
              <ng-template #editRow>
                <div *ngSwitchCase="types.TEXT">
                  <mat-form-field appearance="fill">
                    <mat-label>{{ column.key | titlecase }}</mat-label>
                    <input matInput type="text" [(ngModel)]="element[column.key]" [placeholder]="element[column.key]" />
                  </mat-form-field>
                </div>
                <div *ngSwitchCase="types.EDIT">
                  <button mat-raised-button (click)="element.isEdit = !element.isEdit">
                    <mat-icon>done</mat-icon> Done
                  </button>
                </div>
              </ng-template>
            </ng-container>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="getColumnsName()"></tr>
        <tr mat-row *matRowDef="let row; columns: getColumnsName()"></tr>
      </table>
    </ng-template>
    <mat-paginator
      [ngClass]="(isLoading$ | async) ? 'hidden' : ''"
      [pageSizeOptions]="[5, 10]"
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

  public readonly dataSource = new MatTableDataSource<Entity>([]);
  public readonly types = EntityType;

  public columns: Columns = [];
  public isLoading$: Observable<boolean> = of(true);

  @Input()
  public component!: TableComponent;

  @ViewChild(MatPaginator) public readonly paginator!: MatPaginator;

  constructor(private readonly serviceFactory: ServiceFactory, private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._service = this.serviceFactory.getService(this.component.service);
    this._service.load();

    this.isLoading$ = this._service.isLoading$.pipe(
      tap(() => {
        this.dataSource.paginator?.pageSize;
        this.changeDetectorRef.detectChanges();
      })
    );

    this._synk$.add(this._service.filteredEntities$.subscribe((entities) => (this.dataSource.data = entities)));

    this.columns = this.component.columns;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onEdit(): void {}

  ngOnDestroy(): void {
    this._synk$.unsubscribe();
  }

  getColumnsName(): string[] {
    return this.columns.map((column: Column) => column.key);
  }
}
