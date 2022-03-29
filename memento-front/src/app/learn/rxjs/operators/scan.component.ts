import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Planet } from '../../../shared/model/interface';
import { PlanetService } from '../services/planet.service';

@Component({
  template: `
    <section fxLayout="column" fxLayoutAlign="center center">
      <ul *ngIf="planets$ | async as planets">
        <li *ngFor="let planet of planets">{{ planet.name }}</li>
      </ul>
    </section>
  `,
})
export class ScanComponent {
  planets$: Observable<Planet[]>;

  constructor(private planets: PlanetService) {
    this.planets.loadPaginated();
    this.planets$ = this.planets.filteredEntities$;
  }
}
