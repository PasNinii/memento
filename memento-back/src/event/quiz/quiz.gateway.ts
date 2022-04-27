import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizService } from './quiz.service';

@WebSocketGateway({ cors: '*' })
export class QuizGateway {
  constructor(private readonly quizService: QuizService) {}

  @SubscribeMessage('createQuiz')
  create(@MessageBody() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  @SubscribeMessage('findAllQuiz')
  findAll() {
    return this.quizService.findAll();
  }

  @SubscribeMessage('findOneQuiz')
  findOne(@MessageBody() id: number) {
    return this.quizService.findOne(id);
  }

  @SubscribeMessage('updateQuiz')
  update(@MessageBody() updateQuizDto: UpdateQuizDto) {
    return this.quizService.update(updateQuizDto.id, updateQuizDto);
  }

  @SubscribeMessage('removeQuiz')
  remove(@MessageBody() id: number) {
    return this.quizService.remove(id);
  }
}
