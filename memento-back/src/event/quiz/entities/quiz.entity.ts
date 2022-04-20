import { ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';

export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Question, (question) => question.quiz)
  questions: Question[];
}
