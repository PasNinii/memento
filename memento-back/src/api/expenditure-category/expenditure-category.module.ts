import { Module } from '@nestjs/common';
import { ExpenditureCategoryService } from './expenditure-category.service';
import { ExpenditureCategoryController } from './expenditure-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenditureCategoryRepository } from './expenditure_category.repository';

const repositories = [ExpenditureCategoryRepository];

@Module({
  imports: [TypeOrmModule.forFeature(repositories)],
  controllers: [ExpenditureCategoryController],
  providers: [ExpenditureCategoryService],
})
export class ExpenditureCategoryModule {}
