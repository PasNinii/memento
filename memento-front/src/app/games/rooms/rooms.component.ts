import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Room, RoomService } from '../services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent {
  rooms$: Observable<Room[]>;

  constructor(private readonly rooms: RoomService) {
    this.rooms.load();
    this.rooms$ = this.rooms.rooms$;

    setTimeout(() => {
      this.rooms.create('Room C');
    }, 1000);
  }
}
