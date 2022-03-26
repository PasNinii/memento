import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';
import { Expenditure } from './expenditure.entity';
import { ExpenditureRepository } from './expenditure.repository';

@Injectable()
export class ExpenditureService {
  constructor(private readonly expenditureRepository: ExpenditureRepository) {}

  create(userId: string, createExpenditureDto: CreateExpenditureDto) {
    return this.expenditureRepository.save({
      ...createExpenditureDto,
      userId,
    });
  }

  async findAll(userId: string): Promise<Expenditure[]> {
    return this.expenditureRepository
      .createQueryBuilder('expenditure')
      .leftJoinAndSelect('expenditure.category', 'expenditure_category')
      .where({ userId })
      .orderBy('expenditure_category.create_date', 'ASC')
      .orderBy('expenditure_category.name', 'DESC')
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
