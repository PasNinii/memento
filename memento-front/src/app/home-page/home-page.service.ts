import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  add(a: number, b: number): any {
    return a + b;
  }
}
