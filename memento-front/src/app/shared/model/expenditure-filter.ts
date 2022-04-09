import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpenditureFilter {
  public lastDay: string = '';
  public firstDay: string = '';
  public category: string = '';

  constructor() {}

  public resetDate() {
    this.lastDay = '';
    this.firstDay = '';
  }

  public resetCategory(): void {
    this.category = '';
  }

  public resetAll(): void {
    this.lastDay = '';
    this.firstDay = '';
    this.category = '';
  }
}
