import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GamesRoutingModule } from './games-routing.module';
import { CreateRoomComponent } from './rooms/create-room/create-room.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { RoomComponent } from './rooms/room/room.component';
import { RoomsComponent } from './rooms/rooms.component';

@NgModule({
  imports: [CommonModule, GamesRoutingModule],
  declarations: [RoomsComponent, RoomListComponent, RoomComponent, CreateRoomComponent],
})
export class GamesModule {}
