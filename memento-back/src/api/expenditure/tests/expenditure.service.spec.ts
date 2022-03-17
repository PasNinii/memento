import { Test, TestingModule } from '@nestjs/testing';
import { ExpenditureRepository } from '../expenditure.repository';
import { ExpenditureService } from '../expenditure.service';
import {
  MockType,
  repositoryMockFactory,
} from '../../../shared/tests/mock-type';

describe('ExpenditureService', () => {
  let service: ExpenditureService;
  let repository: MockType<ExpenditureRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenditureService,
        { provide: ExpenditureRepository, useFactory: repositoryMockFactory },
      ],
    }).compile();

    service = module.get<ExpenditureService>(ExpenditureService);
    repository = module.get(ExpenditureRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
