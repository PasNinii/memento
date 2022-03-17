import { Test, TestingModule } from '@nestjs/testing';
import {
  MockType,
  repositoryMockFactory,
} from '../../../shared/tests/mock-type';
import { ExpenditureCategoryController } from '../expenditure-category.controller';
import { ExpenditureCategoryService } from '../expenditure-category.service';
import { ExpenditureCategoryRepository } from '../expenditure_category.repository';

describe('ExpenditureCategoryController', () => {
  let controller: ExpenditureCategoryController;
  let repository: MockType<ExpenditureCategoryRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenditureCategoryController],
      providers: [
        ExpenditureCategoryService,
        {
          provide: ExpenditureCategoryRepository,
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<ExpenditureCategoryController>(
      ExpenditureCategoryController,
    );

    repository = module.get(ExpenditureCategoryRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
