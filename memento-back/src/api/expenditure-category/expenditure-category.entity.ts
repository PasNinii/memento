import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Expenditure } from '../expenditure/expenditure.entity';

@Entity()
export class ExpenditureCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isBanned: boolean;

  @OneToMany(() => Expenditure, (expediture) => expediture.category)
  expenditures: Expenditure[];
}
