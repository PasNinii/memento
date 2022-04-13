import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Movie } from '../../../shared/model/interface';
import { MovieService } from '../../../shared/services/services.service';

@Component({
  selector: 'app-movie-detail',
  template: `
    <section *ngIf="movie$ | async as movie; else loading">{{ movie.id }} {{ movie.name }}</section>

    <ng-template #loading>
      <mat-spinner></mat-spinner>
    </ng-template>
  `,
})
export class MovieDetailComponent {
  movie$: Observable<Movie | undefined>;
  constructor(private readonly movies: MovieService, private readonly route: ActivatedRoute) {
    this.movie$ = this.route.params.pipe(
      switchMap((param: Params) => {
        this.movies.setId(param['id']);
        return this.movies.selectedEntity$;
      })
    );
  }
}
