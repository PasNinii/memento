import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Movie } from '../model/interface';
import { Service } from './abstract.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends Service<Movie> {
  protected override url: string = `${environment.serverUrl}/api/movies`;
}
