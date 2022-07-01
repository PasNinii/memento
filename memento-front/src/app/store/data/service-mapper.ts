import { InterviewQuestionService } from './interview-question.service';

export type Service = InterviewQuestionService;

export const getService = (serviceName: string) => {
  switch (serviceName) {
    case 'InterviewQuestion':
      return InterviewQuestionService;
    default:
      return InterviewQuestionService;
  }
};
