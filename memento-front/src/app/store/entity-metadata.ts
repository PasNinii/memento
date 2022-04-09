import {
  EntityMetadataMap,
  EntityDataModuleConfig,
  DefaultDataServiceConfig,
} from '@ngrx/data';
import { environment as env } from '../../environments/environment';
import { Expenditure } from '../shared/model/expenditure';
import { ExpenditureFilter } from '../shared/model/expenditure-filter';

export function expenditureFilters(
  entities: Expenditure[],
  filters: ExpenditureFilter
) {
  if (filters) {
    return entities
      .filter((e) =>
        filters.category ? e.category.name === filters.category : e
      )
      .filter((e) =>
        filters.firstDay && filters.lastDay
          ? e.expendDate > filters.firstDay && e.expendDate < filters.lastDay
          : e
      );
  }

  return entities;
}

const entityMetadata: EntityMetadataMap = {
  Expenditure: {
    filterFn: expenditureFilters,
  },
  ExpenditureCategory: {},
};

const pluralNames = {};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  entityHttpResourceUrls: {
    Expenditure: {
      collectionResourceUrl: `${env.serverUrl}/api/expenditure`,
      entityResourceUrl: `${env.serverUrl}/api/expenditure`,
    },
    ExpenditureCategory: {
      collectionResourceUrl: `${env.serverUrl}/api/expenditure-category`,
      entityResourceUrl: `${env.serverUrl}/api/expenditure-category`,
    },
  },
};
