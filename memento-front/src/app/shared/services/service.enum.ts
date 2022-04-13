import { Injectable } from '@angular/core';
import { Entity, IService, ServiceEnum } from '../model/interface';
import {
  MovieService,
  SerieService,
  ExpenditureService,
} from './services.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceFactory {
  constructor(
    private readonly _movies: MovieService,
    private readonly _series: SerieService,
    private readonly _expenditures: ExpenditureService
  ) {}

  public getService(type: ServiceEnum): IService<Entity> {
    switch (type) {
      case ServiceEnum.MOVIE:
        return this._movies;

      case ServiceEnum.SERIE:
        return this._series;

      case ServiceEnum.EXPENDITURE:
        return this._expenditures;

      default:
        return this._movies;
    }
  }
}
