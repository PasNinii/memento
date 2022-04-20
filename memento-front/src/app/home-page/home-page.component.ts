import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements ControlValueAccessor {
  private readonly _entities$ = new BehaviorSubject<Elements>([
    { name: 'A', category: 'A' },
    { name: 'B', category: 'B' },
    { name: 'C', category: 'C' },
    { name: 'D', category: 'D' },
    { name: 'E', category: 'A' },
    { name: 'F', category: 'B' },
    { name: 'G', category: 'C' },
    { name: 'H', category: 'D' },
    { name: 'I', category: 'A' },
    { name: 'J', category: 'B' },
    { name: 'K', category: 'C' },
    { name: 'L', category: 'D' },
    { name: 'M', category: 'A' },
    { name: 'O', category: 'B' },
    { name: 'P', category: 'C' },
    { name: 'Q', category: 'D' },
    { name: 'R', category: 'A' },
    { name: 'S', category: 'B' },
    { name: 'T', category: 'C' },
    { name: 'U', category: 'D' },
    { name: 'V', category: 'A' },
    { name: 'W', category: 'B' },
    { name: 'X', category: 'C' },
    { name: 'Y', category: 'D' },
    { name: 'Z', category: 'A' },
  ]);
  public readonly entities$ = this._entities$.asObservable();

  constructor() {}

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }

  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }

  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
}

type Category = 'A' | 'B' | 'C' | 'D';

export interface Element {
  name: string;
  category: Category;
}

export type Elements = Element[];
