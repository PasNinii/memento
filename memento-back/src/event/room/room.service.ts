import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomsService {
  constructor(private readonly rooms: RoomRepository) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    return this.rooms.save(createRoomDto);
  }

  async findAll(): Promise<Room[]> {
    return this.rooms.find();
  }

  async findOne(id: string): Promise<Room> {
    return this.rooms.findOne(id);
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const updatedRoom = {
      ...(await this.findOne(id)),
      ...updateRoomDto,
    };

    return this.rooms.save(updatedRoom);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.rooms.delete(id);
  }
}
