import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Planet } from '../../../shared/model/interface';
import { PlanetService } from '../services/planet.service';

@Component({
  template: `
    <section fxLayout="row" fxLayoutAlign="center center">
      <mat-form-field appearance="fill">
        <mat-label>Choose Name</mat-label>
        <input
          matInput
          placeholder="Name"
          type="text"
          [(ngModel)]="filters.name.value"
          (ngModelChange)="onChange()"
          name="search"
        />
      </mat-form-field>
    </section>

    <section fxLayout="column" fxLayoutAlign="center center">
      <ul *ngIf="planets$ | async as planets">
        <li *ngFor="let planet of planets">{{ planet.name }}</li>
      </ul>
    </section>
  `,
})
export class ScanComponent implements OnInit {
  planets$: Observable<Planet[]>;

  public filters = {
    name: {
      value: '',
      operand: 'includes',
    },
  };

  public name: string = '';

  constructor(private planets: PlanetService) {
    this.planets.loadPaginated();
    this.planets$ = this.planets.filteredEntities$;
  }

  ngOnInit(): void {}

  onChange(): void {
    this.planets.setFilter(this.filters);
  }
}
