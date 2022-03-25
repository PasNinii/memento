import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `
    <app-shell>
      <p>test space: {{ test() | async }}</p>
      <router-outlet></router-outlet>
    </app-shell>
  `,
})
export class AppComponent {
  constructor(private readonly http: HttpClient) {}

  test(): Observable<number> {
    return this.http.get<number>(`${environment.serverUrl}/api/test/`);
  }
}
