import { EntityRepository, Repository } from 'typeorm';
import { ExpenditureCategory } from './expenditure-category.entity';

@EntityRepository(ExpenditureCategory)
export class ExpenditureCategoryRepository extends Repository<ExpenditureCategory> {}
