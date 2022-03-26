import { Component } from '@angular/core';

@Component({
  template: `
    <section class="error-page" fxLayout="column" fxLayoutAlign="center center">
      <h1>404 Page Not Found</h1>
      <h2>You're trying to access ghost resources</h2>
    </section>
  `,
})
export class ErrorComponent {}
