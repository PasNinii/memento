import { Injectable } from '@nestjs/common';

const APPLICATION = [
  {
    id: 'basic',
    type: 'type',
    title: 'basic',
    cols: 12,
    rows: '150px',
    filters: [],
    sections: [
      {
        type: 'type',
        title: 'basic',
        components: [
          {
            cols: 12,
            rows: 2,
            type: 'table',
            tableType: 'read',
            title: 'basic',
            service: 'InterviewQuestionService',
            columns: [
              { key: 'question', title: 'Question', type: '' },
              { key: 'code', title: 'Code', type: '' },
              { key: 'category', title: 'Category', type: '' },
              { key: 'answer', title: 'Answer', type: '' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'simple',
    type: 'type',
    title: 'simple',
    cols: 12,
    rows: '100px',
    filters: [],
    sections: [
      {
        type: 'type',
        title: 'simple',
        cols: 12,
        rows: 1,
        components: [
          {
            cols: 12,
            rows: 1,
            type: 'type',
            title: 'simple',
            service: 'service',
          },
        ],
      },
    ],
  },
];

@Injectable()
export class AppService {
  public getPage(pageId: string) {
    return APPLICATION.find((page) => pageId === page.id);
  }

  public getRoutes() {
    return APPLICATION.map((page) => ({
      id: page.id,
      path: `page/${page.id}`,
      component: 'BuilderComponent',
    }));
  }
}
