import { Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quiz } from './quiz.entity';

export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;

  @ManyToMany(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz[];
}
