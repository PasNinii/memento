import {
  AfterViewInit,
  Directive,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Column, ITableComponent } from '../../shared/services/page.service';
import * as ServiceMapper from '../../store/data/service-mapper';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, Subscription, tap } from 'rxjs';

@Directive({
  selector: 'appAbstractTable',
})
export class AbstractTable implements OnInit, AfterViewInit, OnDestroy {
  private _sink$ = new Subscription();
  private _service: ServiceMapper.Service = {} as ServiceMapper.Service;

  @Input() public component!: ITableComponent;
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  public dataSource = new MatTableDataSource([]);
  public isLoaded$: Observable<boolean> = of(true);
  public columns: Column[] = [];

  constructor(private readonly _injector: Injector) {}

  ngOnInit(): void {
    this._service = this._injector.get(
      ServiceMapper.getService(this.component.service)
    );

    this._service.load();

    this._sink$.add(
      this._service.filteredEntities$.subscribe(
        (entities) => (this.dataSource.data = entities as never[])
      )
    );

    this.isLoaded$ = this._service.loaded$.pipe(
      tap(() => {
        this.dataSource.paginator?.pageSize;
      })
    );

    this.columns = this.component.columns;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this._sink$.unsubscribe();
  }

  getEntities() {
    return this._service.entities$;
  }

  getColumnsName(): string[] {
    return this.columns.map((column: Column) => column.key);
  }
}
