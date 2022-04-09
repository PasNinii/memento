import { Injectable } from '@angular/core';
import { Entity, IService, ServiceEnum } from '../model/interface';
import { MovieService } from './movie.service';
import { SerieService } from './serie.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceFactory {
  constructor(
    private readonly _movies: MovieService,
    private readonly _series: SerieService
  ) {}

  public getService(type: ServiceEnum): IService<Entity> {
    switch (type) {
      case ServiceEnum.MOVIE:
        return this._movies;

      case ServiceEnum.SERIE:
        return this._series;

      default:
        return this._movies;
    }
  }
}
