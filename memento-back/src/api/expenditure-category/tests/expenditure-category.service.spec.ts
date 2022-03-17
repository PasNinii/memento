import { Test, TestingModule } from '@nestjs/testing';
import {
  MockType,
  repositoryMockFactory,
} from '../../../shared/tests/mock-type';
import { ExpenditureCategoryService } from '../expenditure-category.service';
import { ExpenditureCategoryRepository } from '../expenditure_category.repository';

describe('Expenditure Category Service', () => {
  let service: ExpenditureCategoryService;
  let repository: MockType<ExpenditureCategoryRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenditureCategoryService,
        {
          provide: ExpenditureCategoryRepository,
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ExpenditureCategoryService>(
      ExpenditureCategoryService,
    );

    repository = module.get(ExpenditureCategoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should test get operation', () => {
    it('should get all expenditure categories', async () => {
      repository.find.mockReturnValue([]);

      const expenditures = service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(expenditures).toBeDefined();
    });
  });
});
