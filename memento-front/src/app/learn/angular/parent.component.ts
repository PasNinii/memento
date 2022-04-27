import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-parent-component',
  template: `
    <section fxLayout="row" fxLayoutAlign="center center">
      <app-child-component [settings]="settings"></app-child-component>
      <div>
        {{ settings | json }}
      </div>
    </section>
  `,
})
export class ParentComponent {
  settings = {
    id: 1,
    task: 'A',
    nested: {
      name: 'G',
    },
  };
}
