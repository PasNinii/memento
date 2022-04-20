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
  templateUrl: './simple-table.component.html',
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
