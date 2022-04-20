import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { DeleteResult } from 'typeorm';

import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { RoomsService } from './room.service';

@WebSocketGateway({ cors: '*' })
export class RoomsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly roomsService: RoomsService) {}

  @SubscribeMessage('createRoom')
  async create(@MessageBody() createRoomDto: CreateRoomDto): Promise<void> {
    console.log(createRoomDto);
    await this.roomsService.create(createRoomDto);

    this.findAll();
  }

  @SubscribeMessage('findAllRooms')
  async findAll(): Promise<void> {
    this.server.emit('roomsFound', await this.roomsService.findAll());
  }

  @SubscribeMessage('findOneRoom')
  async findOne(@MessageBody() id: string): Promise<Room> {
    return this.roomsService.findOne(id);
  }

  @SubscribeMessage('updateRoom')
  async update(@MessageBody() updateRoomDto: UpdateRoomDto): Promise<Room> {
    return this.roomsService.update(updateRoomDto.id, updateRoomDto);
  }

  @SubscribeMessage('removeRoom')
  async remove(@MessageBody() id: number): Promise<DeleteResult> {
    return this.roomsService.remove(id);
  }
}
