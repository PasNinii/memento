import { Module } from '@nestjs/common';
import { ExpenditureService } from './expenditure.service';
import { ExpenditureController } from './expenditure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenditureRepository } from './expenditure.repository';

const repositories = [ExpenditureRepository];

@Module({
  imports: [TypeOrmModule.forFeature(repositories)],
  controllers: [ExpenditureController],
  providers: [ExpenditureService],
})
export class ExpenditureModule {}
