import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizGateway } from './quiz.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../room/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [QuizGateway, QuizService],
})
export class QuizModule {}
