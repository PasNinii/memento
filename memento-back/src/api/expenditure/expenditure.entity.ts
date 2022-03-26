import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExpenditureCategory } from '../expenditure-category/expenditure-category.entity';

@Entity('expenditure')
export class Expenditure {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ name: 'create_date', type: 'timestamp', default: '() => NOW()' })
  createDate: Date;

  @Column({ name: 'update_date', type: 'timestamp', default: '() => NOW()' })
  updateDate: Date;

  @Column({ name: 'expend_date', type: 'timestamp', default: '() => NOW()' })
  expendDate: Date;

  @JoinColumn({ name: 'category_id' })
  @ManyToOne(() => ExpenditureCategory, (category) => category.expenditures)
  category: ExpenditureCategory;
}
