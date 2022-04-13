import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  log(message: string = 'Something went wrong', type: 'success' | 'warning' | 'error'): any {
    let icon = null;

    switch (type) {
      case 'success':
        icon = '✅';
        break;
      case 'warning':
        icon = '☣️';
        break;
      case 'error':
        icon = '❌';
        break;
      default:
        icon = '❓';
        break;
    }

    this.snackBar.open(message, 'OK', {
      duration: 5000,
    });
  }
}
