import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-spinner',
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="spinner" fxLayout="row" fxLayoutAlign="center center">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styles: [``],
})
export class SpinnerComponent {}
