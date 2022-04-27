import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuizGateway } from './quiz/quiz.gateway';
import { QuizService } from './quiz/quiz.service';
import { RoomsGateway } from './room/room.gateway';
import { PlayerRepository, RoomRepository } from './room/room.repository';
import { RoomsService } from './room/room.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerRepository, RoomRepository])],
  providers: [QuizGateway, QuizService, RoomsGateway, RoomsService],
})
export class EventModule {}
