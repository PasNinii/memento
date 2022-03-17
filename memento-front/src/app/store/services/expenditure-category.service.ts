import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { ExpenditureCategory } from '../../shared/model/expenditure';

@Injectable({
  providedIn: 'root',
})
export class ExpenditureCategoryService extends EntityCollectionServiceBase<ExpenditureCategory> {
  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super('ExpenditureCategory', elementsFactory);
  }
}
