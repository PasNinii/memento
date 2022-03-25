import { Injectable } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TestService {
  private i = 0;
  origin$ = new Observable<number>((subscriber) => {
    setInterval(() => {
      subscriber.next(this.i++);
    }, 2000);
  });
  target$: Observable<number>;

  constructor() {
    this.target$ = this.origin$.pipe(tap((i) => console.log(i)));
  }

  test(): Observable<number> {
    return this.target$;
  }
}
