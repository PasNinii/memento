import { Component } from '@angular/core';

@Component({
  template: `
    <section fxLayout="column" fxLayoutAlign="center center">
      <h1>Welcome to RxJS World</h1>
    </section>
    <router-outlet></router-outlet>
  `,
})
export class RxJSComponent {}
