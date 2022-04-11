import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Expenditure } from '../model/expenditure';
import { Movie } from '../model/interface';
import { Service } from './abstract.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends Service<Movie> {
  protected override url: string = `${environment.serverUrl}/api/movies`;
}

@Injectable({
  providedIn: 'root',
})
export class SerieService extends Service<Movie> {
  protected override url: string = `${environment.serverUrl}/api/movies`;
}

@Injectable({
  providedIn: 'root',
})
export class ExpenditureService extends Service<Expenditure> {
  protected override url: string = `${environment.serverUrl}/api/expenditure`;
}
