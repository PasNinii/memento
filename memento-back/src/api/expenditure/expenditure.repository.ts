import { EntityRepository, Repository } from 'typeorm';
import { Expenditure } from './expenditure.entity';

@EntityRepository(Expenditure)
export class ExpenditureRepository extends Repository<Expenditure> {}
