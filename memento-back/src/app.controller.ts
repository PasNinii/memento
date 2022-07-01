import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly _pages: AppService) {}

  @Get('page/:id')
  getSimplePage(@Param('id') id: string) {
    return this._pages.getPage(id);
  }

  @Get('routes')
  getRoutes() {
    return this._pages.getRoutes();
  }

  @Get('interview/questions')
  getInterviewQuestions() {
    return [
      {
        id: 0,
        question: 'Composition vs Inheritance',
        code: 'export class A extends B {}',
        answer: 'Question answer',
        category: ['general', 'oop'],
        difficulty: 'easy',
      },
    ];
  }
}
