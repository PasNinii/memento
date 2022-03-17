import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Expenditure } from '../../shared/model/expenditure';

@Injectable({
  providedIn: 'root',
})
export class ExpenditureService extends EntityCollectionServiceBase<Expenditure> {
  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super('Expenditure', elementsFactory);
  }
}
