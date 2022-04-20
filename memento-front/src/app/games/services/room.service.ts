import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export interface Room {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class RoomService implements OnDestroy {
  private readonly _rooms$ = new BehaviorSubject<Room[]>([]);
  private readonly _sink$ = new Subscription();
  private _activeUser: any;

  public readonly rooms$ = this._rooms$.asObservable();

  constructor(private readonly socket: Socket, private readonly auth: AuthService) {
    this._sink$.add(this.auth.user$.subscribe((user) => (this._activeUser = user)));
  }

  load(): void {
    this.socket.emit('findAllRooms');

    this._sink$.add(
      this.socket.fromEvent('roomsFound').subscribe((rooms: any) => {
        console.log('called');
        this._rooms$.next(rooms);
      })
    );
  }

  create(name: string): void {
    this.socket.emit('createRoom', {
      name,
      image: name,
      player: {
        id: this._activeUser.sub,
        name: this._activeUser.nickname,
      },
    });
  }

  ngOnDestroy(): void {
    this._sink$.unsubscribe();
  }
}
