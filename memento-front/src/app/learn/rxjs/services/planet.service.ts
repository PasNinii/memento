import { Injectable } from '@angular/core';
import { Planet } from '../../../shared/model/interface';
import { Service } from '../../../shared/services/abstract.service';

@Injectable({
  providedIn: 'root',
})
export class PlanetService extends Service<Planet> {
  protected override url: string = 'https://swapi.dev/api/planets/';
}
