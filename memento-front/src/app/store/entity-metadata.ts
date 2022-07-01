import {
  EntityMetadataMap,
  EntityDataModuleConfig,
  DefaultDataServiceConfig,
} from '@ngrx/data';
import { environment } from '../../environments/environment';

const entityMetadata: EntityMetadataMap = {
  InterviewQuestion: {},
};

const pluralNames = {};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  entityHttpResourceUrls: {
    InterviewQuestion: {
      collectionResourceUrl: `${environment.server.rest}/interview/questions`,
      entityResourceUrl: `${environment.server.rest}/interview/questions`,
    },
  },
};
