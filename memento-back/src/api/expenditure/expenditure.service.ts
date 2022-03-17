import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';
import { Expenditure } from './expenditure.entity';
import { ExpenditureRepository } from './expenditure.repository';

@Injectable()
export class ExpenditureService {
  constructor(private readonly expenditureRepository: ExpenditureRepository) {}

  create(createExpenditureDto: CreateExpenditureDto) {
    return this.expenditureRepository.save(createExpenditureDto);
  }

  async findAll(): Promise<Expenditure[]> {
    return this.expenditureRepository
      .createQueryBuilder('expenditure')
      .leftJoinAndSelect('expenditure.category', 'expenditure_category')
      .orderBy('expenditure_category.name', 'ASC')
      .getMany();
  }

  async findOne(id: number): Promise<Expenditure> {
    return this.expenditureRepository.findOne(id);
  }

  async update(
    id: number,
    updateExpenditureDto: UpdateExpenditureDto,
  ): Promise<Expenditure> {
    const expenditure = {
      ...(await this.findOne(id)),
      ...updateExpenditureDto,
    };

    return this.expenditureRepository.save(expenditure);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.expenditureRepository.delete(id);
  }
}
