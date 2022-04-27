import { EntityRepository, Repository } from 'typeorm';
import { Player, Room } from './entities/room.entity';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {}

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> {}
