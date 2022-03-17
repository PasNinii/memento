import { Injectable, Logger } from '@nestjs/common';
import { CreateExpenditureCategoryDto } from './dto/create-expenditure-category.dto';
import { UpdateExpenditureCategoryDto } from './dto/update-expenditure-category.dto';
import { ExpenditureCategoryRepository } from './expenditure_category.repository';

@Injectable()
export class ExpenditureCategoryService {
  private logger = new Logger(ExpenditureCategoryService.name);

  constructor(
    private readonly expenditureCategoryRepository: ExpenditureCategoryRepository,
  ) {}

  create(createExpenditureCategoryDto: CreateExpenditureCategoryDto) {
    this.logger.log(`${JSON.stringify(CreateExpenditureCategoryDto)}`);

    return 'This action adds a new expenditureCategory';
  }

  findAll() {
    return this.expenditureCategoryRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} expenditureCategory`;
  }

  update(
    id: number,
    updateExpenditureCategoryDto: UpdateExpenditureCategoryDto,
  ) {
    return `This action updates a #${id} expenditureCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenditureCategory`;
  }
}
