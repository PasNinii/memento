import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpenditureFilter {
  lastDay: string = '';
  firstDay: string = '';
  category: string = '';

  constructor() {}

  resetDate() {
    this.lastDay = '';
    this.firstDay = '';
  }

  resetCategory(): void {
    this.category = '';
  }

  resetAll(): void {
    this.lastDay = '';
    this.firstDay = '';
    this.category = '';
  }
}
