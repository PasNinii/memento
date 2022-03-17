import { Test, TestingModule } from '@nestjs/testing';
import {
  MockType,
  repositoryMockFactory,
} from '../../../shared/tests/mock-type';
import { ExpenditureController } from '../expenditure.controller';
import { ExpenditureRepository } from '../expenditure.repository';
import { ExpenditureService } from '../expenditure.service';

describe('ExpenditureController', () => {
  let controller: ExpenditureController;
  let repository: MockType<ExpenditureRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenditureController],
      providers: [
        ExpenditureService,
        { provide: ExpenditureRepository, useFactory: repositoryMockFactory },
      ],
    }).compile();

    controller = module.get<ExpenditureController>(ExpenditureController);
    repository = module.get(ExpenditureRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
