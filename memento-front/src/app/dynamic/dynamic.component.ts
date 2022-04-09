import { Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { CustomComponentDirective } from '../shared/directives/custom-component.directive';
import { Config, MockConfig } from '../shared/model/interface';
import { ServiceFactory } from '../shared/services/service.enum';

@Component({
  template: `
    <section fxLayout="column" fxLayoutAlign="center center">
      <ng-template appCustomComponent></ng-template>
    </section>
  `,
})
export class DynamicComponent implements OnInit {
  @ViewChild(CustomComponentDirective, { static: true })
  custom!: CustomComponentDirective;

  public config: Config = MockConfig;

  constructor() {}

  ngOnInit(): void {
    const viewContainerRef = this.custom.viewContainerRef;

    for (let component of this.config.components) {
      const componentRef = viewContainerRef.createComponent<any>(
        component.type
      );

      componentRef.instance.component = component;
    }
  }
}
