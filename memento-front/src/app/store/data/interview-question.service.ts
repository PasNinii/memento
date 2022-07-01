import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

export interface InterviewQuestion {
  id: number;
  question: string;
  code: string;
  answer: string;
  category: string;
  difficulty: string;
}

@Injectable({
  providedIn: 'root',
})
export class InterviewQuestionService extends EntityCollectionServiceBase<InterviewQuestion> {
  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super('InterviewQuestion', elementsFactory);
  }
}
