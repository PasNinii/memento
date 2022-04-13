import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from '../../../shared/model/interface';
import { MovieService } from '../../../shared/services/services.service';

@Component({
  template: `
    <section *ngIf="movies$ | async as movies; else loading" fxLayout="column" fxLayoutAlign="center center">
      <div>
        <ul>
          <li *ngFor="let movie of movies" [routerLink]="['detail', movie.id]">
            {{ movie.name }}
          </li>
        </ul>
      </div>

      <router-outlet></router-outlet>
    </section>

    <ng-template #loading>
      <mat-spinner></mat-spinner>
    </ng-template>
  `,
})
export class MovieListComponent {
  movies$: Observable<Movies>;

  constructor(private readonly service: MovieService) {
    this.service.load(true);
    this.movies$ = this.service.filteredEntities$;
  }
}
