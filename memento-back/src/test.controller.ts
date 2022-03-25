import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly service: TestService) {}

  @Get()
  test(): Observable<number> {
    return this.service.test();
  }
}
